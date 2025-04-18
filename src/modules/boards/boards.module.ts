import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsUserController } from './controllers/boards-user.controller';
import { BoardsDao } from './boards.dao';

@Module({
  controllers: [BoardsUserController],
  providers: [BoardsService, BoardsDao],
})
export class BoardsModule {}
