import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersAuthController } from './controllers/users.auth.controller';
import { UsersDao } from './users.dao';

@Module({
  controllers: [UsersAuthController],
  providers: [UsersService, UsersDao],
  exports: [UsersDao],
})
export class UsersModule {}
