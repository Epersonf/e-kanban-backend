import { HttpException, Injectable } from '@nestjs/common';
import { BatchCreateSwimlaneDto } from './dto/create-swimlane.dto';
import { BatchUpdateSwimlaneDto } from './dto/update-swimlane.dto';
import { PaginationDto } from 'src/core/dtos/pagination.dto';
import { Swimlane } from './entities/swimlane.entity';
import { FilterSwimlaneDto } from './dto/filter-swimlane.dto';
import { SwimlanesDao } from './swimlanes.dao';

@Injectable()
export class SwimlanesService {
  constructor(
    private readonly swimlanesDao: SwimlanesDao,
  ) {}

  async findAll(params: {
    pagination?: PaginationDto;
    filters?: FilterSwimlaneDto;
  }) {
    return this.swimlanesDao.findAll({
      filters: params.filters,
      pagination: params.pagination
    });
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
