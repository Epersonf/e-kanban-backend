import { Injectable } from '@nestjs/common';
import { TasksDao } from './tasks.dao';

@Injectable()
export class TasksService {

  constructor(
    private readonly tasksDao: TasksDao,
  ) {}

}
