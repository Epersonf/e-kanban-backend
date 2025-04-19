import { HttpException, Injectable } from '@nestjs/common';
import { BatchCreateBoardDto } from './dto/create-board.dto';
import { BatchUpdateBoardDto } from './dto/update-board.dto';
import { FilterBoardDto } from './dto/filter-board.dto';
import { PaginationDto } from 'src/core/dtos/pagination.dto';
import { BoardsDao } from './boards.dao';
import { Board } from './entities/board.entity';
import { PopulateBoardDto } from './dto/populate-board.dto';
import { SwimlanesService } from '../swimlanes/swimlanes.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class BoardsService {

  constructor(
    private readonly boardsDao: BoardsDao,
    private readonly swimlanesService: SwimlanesService,
    private readonly usersService: UsersService,
  ) {}

  async findAll(params: {
    userId?: string;
    pagination?: PaginationDto;
    populate?: PopulateBoardDto;
    filters?: FilterBoardDto;
  }) {
    const boardsPage = await this.boardsDao.findAll({
      filters: {
        ...params.filters,
        memberId: params.userId,
      },
      pagination: params.pagination
    });

    if (params.populate?.populateWithSwimlanes) {
      const swimlanes = await this.swimlanesService.findAll({
        filters: {
          boardIds: boardsPage.items.map(board => board.getId()),
        },
        populate: {
          populateWithTasks: true,
        },
      });
      boardsPage.items.forEach(board => board.setSwimlanes(swimlanes.items.filter(swimlane => swimlane.getBoardId() === board.getId())));
    }

    if (params.populate?.populateWithMembers) {
      const members = await this.usersService.findAll({
        filters: {
          ids: boardsPage.items.flatMap(board => board.getMemberIds()),
        },
      });
      boardsPage.items.forEach(board => board.setMembers(members.items.filter(member => board.getMemberIds().includes(member.getId()))));
    }

    return boardsPage;
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
      board.update();
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
