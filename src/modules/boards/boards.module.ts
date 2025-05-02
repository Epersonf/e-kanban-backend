import { forwardRef, Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsUserController } from './controllers/boards-user.controller';
import { BoardsDao } from './boards.dao';
import { SwimlanesModule } from '../swimlanes/swimlanes.module';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [BoardsUserController],
  providers: [BoardsService, BoardsDao],
  imports: [
    forwardRef(() => SwimlanesModule),
    UsersModule
  ],
})
export class BoardsModule {}
