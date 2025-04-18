import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsEmail, IsString, IsStrongPassword, ValidateNested } from "class-validator";

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string;
  
  @ApiProperty()
  @IsString()
  surname: string;
  
  @ApiProperty()
  @IsString()
  @IsStrongPassword()
  password: string;
  
  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;
}

export class BatchCreateUserDto {
  @Type(() => CreateUserDto)
  @ValidateNested({ each: true })
  @IsArray()
  users: CreateUserDto[];
}
