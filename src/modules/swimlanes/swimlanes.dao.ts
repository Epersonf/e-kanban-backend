import { Injectable } from "@nestjs/common";
import { BaseDao } from "src/core/daos/base.dao";
import { Swimlane } from "./entities/swimlane.entity";
import { FilterSwimlaneDto } from "./dto/filter-swimlane.dto";
import { PaginationDto } from "src/core/dtos/pagination.dto";
import { PaginatedListDto } from "src/core/dtos/paginated-list.dto";
import { Datastore } from "@google-cloud/datastore";

@Injectable()
export class SwimlanesDao extends BaseDao<Swimlane> {
  protected tableName: string = "swimlanes";

  constructor(datastore: Datastore) {
    super(datastore, Swimlane);
  }

  async findAll(params: {
    filters?: FilterSwimlaneDto;
    pagination?: PaginationDto;
  }): Promise<PaginatedListDto<Swimlane>> {
    return super.findAll(params);
  }
}
