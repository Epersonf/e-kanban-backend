import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { CreateBoardDto } from '../dto/create-board.dto';
import { BoardsService } from '../boards.service';
import { UpdateBoardDto } from '../dto/update-board.dto';
import { Auth } from 'src/core/middlewares/user-validation/user-validation.decorator';
import { PaginationDto } from 'src/core/dtos/pagination.dto';
import { FilterBoardDto } from '../dto/filter-board.dto';
import { UserTokenModel } from 'src/core/utils/token/user-token.model';

@Controller('boards/user')
export class BoardsUserController {
  constructor(private readonly boardsService: BoardsService) {}

  @Auth()
  @Get()
  findAll(
    @Query() pagination: PaginationDto,
    @Query() filters: FilterBoardDto,
    @Req() req: Request
  ) {
    const user = req.headers['user'] as UserTokenModel;
    return this.boardsService.findAll({
      pagination,
      filters: {
        ...filters,
        ids: user.boards,
      },
    });
  }

  @Auth()
  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.create(createBoardDto);
  }
  
  @Auth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardsService.update(id, updateBoardDto);
  }

  @Auth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardsService.remove(id);
  }
}
