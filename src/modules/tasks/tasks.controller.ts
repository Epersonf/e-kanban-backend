import { Controller, Get, Post, Body, Patch, Delete, Query, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { BatchCreateTaskDto } from './dtos/create-task.dto';
import { BatchUpdateTaskDto } from './dtos/update-task.dto';
import { FilterTaskDto } from './dtos/filter-task.dto';
import { PaginationDto } from 'src/core/dtos/pagination.dto';
import { PaginatedListDto } from 'src/core/dtos/paginated-list.dto';
import { Task } from './entities/task.entity';
import { DeleteDto } from 'src/core/dtos/delete.dto';
import { Auth } from 'src/core/middlewares/user-validation/user-validation.decorator';
import { UserTokenModel } from 'src/core/utils/token/user-token.model';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('tasks/user')
@ApiTags('Tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Auth()
  @Get()
  @ApiResponse({ status: 200, type: PaginatedListDto })
  findAll(
    @Query() pagination: PaginationDto,
    @Query() filters: FilterTaskDto,
    @Req() req: Request,
  ): Promise<PaginatedListDto<Task>> {
    const user = req.headers['user'] as UserTokenModel;
    return this.tasksService.findAll({
      userId: user.id,
      pagination,
      filters,
    });
  }

  @Auth()
  @Post()
  @ApiResponse({ status: 201, type: [Task] })
  create(@Body() batchCreateTaskDto: BatchCreateTaskDto, @Req() req: Request): Promise<Task[]> {
    const user = req.headers['user'] as UserTokenModel;
    return this.tasksService.create(user.id, batchCreateTaskDto);
  }

  @Auth()
  @Patch()
  @ApiResponse({ status: 200, type: Task })
  update(@Body() batchUpdateTaskDto: BatchUpdateTaskDto): Promise<Task> {
    return this.tasksService.update(batchUpdateTaskDto);
  }

  @Auth()
  @Delete()
  @ApiResponse({ status: 200, type: [String] })
  remove(@Body() deleteDto: DeleteDto): Promise<string[]> {
    return this.tasksService.remove(deleteDto.ids);
  }
}
