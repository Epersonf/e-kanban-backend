import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { FilterBoardDto } from './dto/filter-board.dto';
import { PaginationDto } from 'src/core/dtos/pagination.dto';
import { BoardsDao } from './boards.dao';

@Injectable()
export class BoardsService {

  constructor(
    private readonly boardsDao: BoardsDao,
  ) {}

  create(createBoardDto: CreateBoardDto) {
    return 'This action adds a new board';
  }

  findAll(params: {
    pagination?: PaginationDto;
    filters?: FilterBoardDto;
  }) {
    return `This action returns all boards`;
  }

  update(id: string, updateBoardDto: UpdateBoardDto) {
    return `This action updates a #${id} board`;
  }

  remove(id: string) {
    return `This action removes a #${id} board`;
  }
}
