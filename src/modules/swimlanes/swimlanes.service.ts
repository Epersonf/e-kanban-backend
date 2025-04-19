import { HttpException, Injectable } from '@nestjs/common';
import { BatchCreateSwimlaneDto } from './dto/create-swimlane.dto';
import { BatchUpdateSwimlaneDto } from './dto/update-swimlane.dto';
import { PaginationDto } from 'src/core/dtos/pagination.dto';
import { Swimlane } from './entities/swimlane.entity';
import { FilterSwimlaneDto } from './dto/filter-swimlane.dto';
import { SwimlanesDao } from './swimlanes.dao';
import { PopulateSwimlaneDto } from './dto/populate-swimlane.dto';
import { TasksService } from '../tasks/tasks.service';

@Injectable()
export class SwimlanesService {
  constructor(
    private readonly swimlanesDao: SwimlanesDao,
    private readonly tasksService: TasksService,
  ) {}

  async findAll(params: {
    pagination?: PaginationDto;
    populate?: PopulateSwimlaneDto;
    filters?: FilterSwimlaneDto;
  }) {
    const swimlanesPage = await this.swimlanesDao.findAll({
      filters: params.filters,
      pagination: params.pagination
    });
    
    if (params.populate?.populateWithTasks) {
      const tasks = await this.tasksService.findAll({
        filters: {
          swimlaneIds: swimlanesPage.items.map(swimlane => swimlane.getId()),
        }
      });

      swimlanesPage.items.forEach(swimlane => {
        swimlane.setTasks(tasks.items.filter(task => task.getSwimlaneId() === swimlane.getId()));
      });
    }

    return swimlanesPage;
  }

  async create(
    batchCreateSwimlaneDto: BatchCreateSwimlaneDto,
  ) {
    const entities = batchCreateSwimlaneDto.swimlanes.map(createSwimlaneDto => new Swimlane({
      name: createSwimlaneDto.name,
      boardId: createSwimlaneDto.boardId,
      order: createSwimlaneDto.order,
    }));

    const swimlane = await this.swimlanesDao.create({
      entities,
    });

    return swimlane;
  }

  async update(batchUpdateSwimlaneDto: BatchUpdateSwimlaneDto) {
    const ids = batchUpdateSwimlaneDto.swimlanes.map(updateSwimlaneDto => updateSwimlaneDto.id);
    const { items : entities } = await this.swimlanesDao.findAll({
      filters: {
        ids,
      }
    });
    if (entities.length !== ids.length) throw new HttpException(`Some swimlanes were not found.`, 404);

    entities.forEach((swimlane) => {
      const updateSwimlaneDto = batchUpdateSwimlaneDto.swimlanes.find(updateSwimlaneDto => updateSwimlaneDto.id === swimlane.getId());
      if (updateSwimlaneDto.name) swimlane.setName(updateSwimlaneDto.name);
      if (updateSwimlaneDto.boardId) swimlane.setBoardId(updateSwimlaneDto.boardId);
      swimlane.update();
    });

    return this.swimlanesDao.update({
      entities,
    });
  }

  remove(ids: string[]) {
    return this.swimlanesDao.delete({
      ids,
    });
  }
}
