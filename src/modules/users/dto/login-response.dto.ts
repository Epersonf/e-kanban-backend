import { User } from "../entities/user.entity";

export class LoginResponseDto {
  token: string;
  user: User;
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