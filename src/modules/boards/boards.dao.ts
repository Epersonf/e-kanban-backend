import { Injectable } from "@nestjs/common";
import { BaseDao } from "src/core/daos/base.dao";
import { Board } from "./entities/board.entity";
import { FilterBoardDto } from "./dto/filter-board.dto";
import { PaginationDto } from "src/core/dtos/pagination.dto";
import { PaginatedListDto } from "src/core/dtos/paginated-list.dto";
import { Datastore, Query } from "@google-cloud/datastore";

@Injectable()
export class BoardsDao extends BaseDao<Board> {
  protected tableName: string = "boards";

  constructor(datastore: Datastore) {
    super(datastore, Board);
  }

  async findAll(params: {
    filters?: FilterBoardDto;
    pagination?: PaginationDto;
  }): Promise<PaginatedListDto<Board>> {
    return super.findAll({
      ...params,
      filterIdsAction: (_: Board) => {
        return true;
      },
      queryFilterAction: (_: Query) => {}
    });
  }
}