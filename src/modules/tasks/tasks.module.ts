import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './controllers/tasks-user.controller';
import { TasksDao } from './tasks.dao';

@Module({
  exports: [TasksService],
  controllers: [TasksController],
  providers: [TasksService, TasksDao],
})
export class TasksModule {}
