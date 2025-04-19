import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from '../dto/login-user.dto';
import { LoginResponseDto } from '../dto/login-response.dto';

@Controller('users/auth')
@ApiTags('Users')
export class UsersAuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @ApiResponse({ type: LoginResponseDto })
  async singup(
    @Body() createUserDto: CreateUserDto
  ): Promise<LoginResponseDto> {
    return this.usersService.singUp(createUserDto);
  }

  @Post('login')
  @ApiResponse({ type: LoginResponseDto })
  async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<LoginResponseDto> {
    return this.usersService.login(loginUserDto);
  }

}
