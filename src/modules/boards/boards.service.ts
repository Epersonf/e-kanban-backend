import { HttpException, Injectable } from '@nestjs/common';
import { BatchCreateBoardDto } from './dto/create-board.dto';
import { BatchUpdateBoardDto } from './dto/update-board.dto';
import { FilterBoardDto } from './dto/filter-board.dto';
import { PaginationDto } from 'src/core/dtos/pagination.dto';
import { BoardsDao } from './boards.dao';
import { Board } from './entities/board.entity';
import { Datastore } from '@google-cloud/datastore';

@Injectable()
export class BoardsService {

  constructor(
    private readonly boardsDao: BoardsDao,
    private readonly datastore: Datastore,
  ) {}

  async findAll(params: {
    userId?: string;
    pagination?: PaginationDto;
    filters?: FilterBoardDto;
  }) {
    return this.boardsDao.findAll({
      filters: {
        ...params.filters,
        memberId: params.userId,
      },
      pagination: params.pagination
    });
  }

  async create(
    creatorId: string,
    batchCreateBoardDto: BatchCreateBoardDto,
  ) {
    const entities = batchCreateBoardDto.boards.map(createBoardDto => new Board({
      name: createBoardDto.name,
      description: createBoardDto.description,
      memberIds: [creatorId],
    }));
    
    const board = await this.boardsDao.create({
      entities,
    });

    return board;
  }

  async update(batchUpdateBoardDto: BatchUpdateBoardDto) {
    const ids = batchUpdateBoardDto.boards.map(updateBoardDto => updateBoardDto.id);
    const { items : entities } = await this.boardsDao.findAll({
      filters: {
        ids,
      }
    });
    if (entities.length !== ids.length) throw new HttpException(`Some boards were not found.`, 404);

    entities.forEach((board) => {
      const updateBoardDto = batchUpdateBoardDto.boards.find(updateBoardDto => updateBoardDto.id === board.getId());
      if (updateBoardDto.name) board.setName(updateBoardDto.name);
      if (updateBoardDto.description) board.setDescription(updateBoardDto.description);
    });

    return this.boardsDao.update({
      entities,
    });
  }

  remove(ids: string[]) {
    return this.boardsDao.delete({
      ids,
    });
  }
}
