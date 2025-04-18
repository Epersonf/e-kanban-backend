import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { BatchCreateBoardDto } from '../dto/create-board.dto';
import { BoardsService } from '../boards.service';
import { BatchUpdateBoardDto } from '../dto/update-board.dto';
import { Auth } from 'src/core/middlewares/user-validation/user-validation.decorator';
import { PaginationDto } from 'src/core/dtos/pagination.dto';
import { FilterBoardDto } from '../dto/filter-board.dto';
import { UserTokenModel } from 'src/core/utils/token/user-token.model';
import { DeleteDto } from 'src/core/dtos/delete.dto';
import { Board } from '../entities/board.entity';
import { PaginatedListDto } from 'src/core/dtos/paginated-list.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('boards/user')
export class BoardsUserController {
  constructor(private readonly boardsService: BoardsService) {}

  @Auth()
  @Get()
  findAll(
    @Query() pagination: PaginationDto,
    @Query() filters: FilterBoardDto,
    @Req() req: Request
  ): Promise<PaginatedListDto<Board>> {
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
  @ApiResponse({ status: 201, type: [Board] })
  create(
    @Body() batchCreateBoardDto: BatchCreateBoardDto,
    @Req() req: Request,
  ): Promise<Board[]> {
    const user = req.headers['user'] as UserTokenModel;
    return this.boardsService.create(user.id, batchCreateBoardDto);
  }
  
  @Auth()
  @Patch()
  @ApiResponse({ status: 200, type: [Board] })
  update(@Body() batchUpdateBoardDto: BatchUpdateBoardDto): Promise<Board[]> {
    return this.boardsService.update(batchUpdateBoardDto);
  }

  @Auth()
  @Delete()
  remove(@Body() deleteDto: DeleteDto): Promise<string[]> {
    return this.boardsService.remove(deleteDto.ids);
  }
}
