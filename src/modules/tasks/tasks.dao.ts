import { BaseDao } from "src/core/daos/base.dao";
import { Task } from "./entities/task.entity";
import { Injectable } from "@nestjs/common";
import { Datastore, PropertyFilter, Query } from "@google-cloud/datastore";
import { FilterTaskDto } from "./dtos/filter-task.dto";
import { PaginationDto } from "src/core/dtos/pagination.dto";
import { PaginatedListDto } from "src/core/dtos/paginated-list.dto";

@Injectable()
export class TasksDao extends BaseDao<Task> {
  protected tableName: string = 'tasks';

  constructor(
    datastore: Datastore
  ) {
    super(datastore, Task);
  }

  async findAll(params: {
    filters?: FilterTaskDto;
    pagination?: PaginationDto;
  }): Promise<PaginatedListDto<Task>> {
    return super.findAll({
      ...params,
      filterIdsAction: (entity: Task) => {
        if (params.filters?.swimlaneIds && params.filters.swimlaneIds.includes(entity.getSwimlaneId())) return false;
        return true;
      },
      queryFilterAction: (query: Query) => {
        if (params.filters?.swimlaneIds) query.filter(new PropertyFilter("swimlaneId", "IN", params.filters.swimlaneIds));
      }
    });
  }

}