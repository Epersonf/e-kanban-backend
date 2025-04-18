import { Injectable, UnauthorizedException, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { UserTokenModel } from '../../utils/token/user-token.model';
import { TokenUtils } from '../../utils/token/token.utils';
import { Reflector } from '@nestjs/core';
import { IS_USER_VALIDATED_PATH } from './user-validation.decorator';

@Injectable()
export class UserValidationMiddleware implements CanActivate {

  constructor(private reflector: Reflector) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const isUserValidatedPath = this.reflector.getAllAndOverride<boolean>(IS_USER_VALIDATED_PATH, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!isUserValidatedPath) return true;

    const req = context.switchToHttp().getRequest<Request>();

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid authorization header.');
    }
    const token = authHeader.split(' ')[1];
    const user: UserTokenModel | null = TokenUtils.verifyToken(token);
    if (!user) throw new UnauthorizedException('Invalid token or token has expired.');
    req.headers['user'] = user as any;
    return true;
  }
}