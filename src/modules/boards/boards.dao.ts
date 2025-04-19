import { Injectable } from "@nestjs/common";
import { BaseDao } from "src/core/daos/base.dao";
import { Board } from "./entities/board.entity";
import { FilterBoardDto } from "./dto/filter-board.dto";
import { PaginationDto } from "src/core/dtos/pagination.dto";
import { PaginatedListDto } from "src/core/dtos/paginated-list.dto";
import { Datastore, PropertyFilter, Query } from "@google-cloud/datastore";

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
      filterIdsAction: (entity: Board) => {
        if (params.filters?.memberId && !entity.getMemberIds().includes(params.filters.memberId)) return false;
        return true;
      },
      queryFilterAction: (query: Query) => {
        if (params.filters?.memberId) query.filter(new PropertyFilter("memberIds", "IN", [params.filters.memberId]));
      }
    });
  }
}