import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TasksDao } from './tasks.dao';

@Module({
  controllers: [TasksController],
  providers: [TasksService, TasksDao],
})
export class TasksModule {}
