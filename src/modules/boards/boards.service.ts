import { HttpException, Injectable } from '@nestjs/common';
import { BatchCreateBoardDto, CreateBoardDto } from './dto/create-board.dto';
import { BatchUpdateBoardDto, UpdateBoardDto } from './dto/update-board.dto';
import { FilterBoardDto } from './dto/filter-board.dto';
import { PaginationDto } from 'src/core/dtos/pagination.dto';
import { BoardsDao } from './boards.dao';
import { Board } from './entities/board.entity';
import { UsersDao } from '../users/users.dao';
import { Datastore, Transaction } from '@google-cloud/datastore';

@Injectable()
export class BoardsService {

  constructor(
    private readonly boardsDao: BoardsDao,
    private readonly usersDao: UsersDao,
    private readonly datastore: Datastore,
  ) {}

  async findAll(params: {
    userId?: string;
    pagination?: PaginationDto;
    filters?: FilterBoardDto;
  }) {
    const user = params.userId ? await this.usersDao.findAll({
      filters: {
        ids: [params.userId],
      }
    }) : null;
    return this.boardsDao.findAll({
      filters: {
        ...params.filters,
        ids: user ? user.items[0].getBoards() : undefined,
      },
      pagination: params.pagination
    });
  }

  async create(
    creatorId: string,
    batchCreateBoardDto: BatchCreateBoardDto,
  ) {
    const transaction = this.datastore.transaction();
    try {

      const entities = batchCreateBoardDto.boards.map(createBoardDto => new Board({
        name: createBoardDto.name,
        description: createBoardDto.description,
      }));
      
      const [ creatorList, board ] = await Promise.all([
        this.usersDao.findAll({
          filters: {
            ids: [creatorId],
          }
        }),
        this.boardsDao.create({
          entities,
          transaction,
        })
      ]);
      
      const creator = creatorList.items[0];
      creator.addToBoard(board[0].getId());

      await this.usersDao.update({
        entities: [creator],
        transaction,
      });

      await transaction.commit();

      return board;
    } catch (error) {
      transaction.rollback();
      throw error;
    }
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
