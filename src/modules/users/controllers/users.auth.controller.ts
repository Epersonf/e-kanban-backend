import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from '../dto/login-user.dto';

@Controller('users/auth')
@ApiTags('users')
export class UsersAuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async singup(
    @Body() createUserDto: CreateUserDto
  ) {
    return this.usersService.singUp(createUserDto);
  }

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
  ) {
    return this.usersService.login(loginUserDto);
  }

}
