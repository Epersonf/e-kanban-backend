import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationDto } from 'src/core/dtos/pagination.dto';
import { FilterUserDto } from './dto/filter-user.dto';
import { UsersDao } from './users.dao';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { TokenUtils } from 'src/core/utils/token/token.utils';
import { UserTokenModel } from 'src/core/utils/token/user-token.model';

@Injectable()
export class UsersService {
  
  constructor(private readonly usersDao: UsersDao) {}

  findAll(params: {
    pagination?: PaginationDto,
    filter?: FilterUserDto,
  }) {
    return this.usersDao.findAll(params);
  }

  async singUp(createUserDto: CreateUserDto) {
    const existentUser = await this.usersDao.findAll({
      filters: {
        emails: [createUserDto.email],
      }
    });
    if (existentUser.items.length > 0) throw new HttpException('User already exists', 400);

    const newUser = await new User({
      name: createUserDto.name,
      email: createUserDto.email,
      password: createUserDto.password,
      surname: createUserDto.surname,
    }).hashPassword();

    return this.usersDao.create({
      entities: [newUser],
    });
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersDao.findAll({
      filters: {
        emails: [loginUserDto.email],
      }
    });
    if (user.items.length === 0) throw new HttpException('User not found', 400);
    const userFound = user.items[0];
    const isPasswordValid = await userFound.comparePassword(loginUserDto.password);
    if (!isPasswordValid) throw new HttpException('Invalid password', 400);

    const expiresAt = new Date().getTime() + 3600 * 24 * 1000;
    const userTokenModel = new UserTokenModel({
      expiresAt,
      id: userFound.getId(),
    });
    const token = TokenUtils.generateToken(userTokenModel);

    return new LoginResponseDto({
      expiresAt,
      token,
      user: userFound,
    });
  }

}
