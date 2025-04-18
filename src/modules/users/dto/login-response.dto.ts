import { ApiProperty } from "@nestjs/swagger";
import { User } from "../entities/user.entity";

export class LoginResponseDto {
  @ApiProperty()
  token: string;
  @ApiProperty({ type: User })
  user: User;
  @ApiProperty()
  expiresAt: number;

  constructor(params: {
    token: string;
    user: User;
    expiresAt: number;
  }) {
    if (!params) return;
    this.token = params.token;
    this.user = params.user;
    this.expiresAt = params.expiresAt;
  }
}