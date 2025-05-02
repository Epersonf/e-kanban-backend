import { HttpException, Injectable } from '@nestjs/common';
import { TasksDao } from './tasks.dao';
import { BatchCreateTaskDto, CreateTaskDto } from './dtos/create-task.dto';
import { BatchUpdateTaskDto, UpdateTaskDto } from './dtos/update-task.dto';
import { FilterTaskDto } from './dtos/filter-task.dto';
import { PaginationDto } from 'src/core/dtos/pagination.dto';
import { Task } from './entities/task.entity';
import { PaginatedListDto } from 'src/core/dtos/paginated-list.dto';

@Injectable()
export class TasksService {
  constructor(private readonly tasksDao: TasksDao) {}

  async create(creatorId: string, batchCreateTaskDto: BatchCreateTaskDto): Promise<Task[]> {
    const tasks = batchCreateTaskDto.tasks.map((createTaskDto: CreateTaskDto) => new Task({
      swimlaneId: createTaskDto.swimlaneId,
      name: createTaskDto.name,
      description: createTaskDto.description,
      creatorId,
      order: createTaskDto.order,
    }));
    const newTask = await this.tasksDao.create({ entities: tasks });
    return newTask;
  }

  async findAll(params: {
    userId?: string;
    pagination?: PaginationDto;
    filters?: FilterTaskDto;
  }): Promise<PaginatedListDto<Task>> {
    return this.tasksDao.findAll({
      filters: params.filters,
      pagination: params.pagination,
    });
  }

  async update(batchUpdateTaskDto: BatchUpdateTaskDto): Promise<any> {
    const ids = batchUpdateTaskDto.tasks.map((updateTaskDto: UpdateTaskDto) => updateTaskDto.id);
    const existingTasks = await this.findAll({ filters: { ids, } });
    if (existingTasks.items.length !== ids.length) throw new HttpException(`Some tasks were not found.`, 404);

    existingTasks.items.forEach((task) => {
      const updateTaskDto = batchUpdateTaskDto.tasks.find((updateTaskDto: UpdateTaskDto) => updateTaskDto.id === task.getId());
      if (updateTaskDto.name) task.setName(updateTaskDto.name);
      if (updateTaskDto.description) task.setDescription(updateTaskDto.description);
      if (updateTaskDto.swimlaneId) task.setSwimlaneId(updateTaskDto.swimlaneId);
      task.update();
    });

    return this.tasksDao.update({ entities: existingTasks.items });
  }

  async remove(ids: string[]): Promise<string[]> {
    return this.tasksDao.delete({ ids });
  }
}
