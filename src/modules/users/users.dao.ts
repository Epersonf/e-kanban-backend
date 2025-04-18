import { BaseDao } from "src/core/daos/base.dao";
import { User } from "./entities/user.entity";
import { Datastore, PropertyFilter, Query } from "@google-cloud/datastore";
import { Injectable } from "@nestjs/common";
import { FilterUserDto } from "./dto/filter-user.dto";
import { PaginationDto } from "src/core/dtos/pagination.dto";
import { PaginatedListDto } from "src/core/dtos/paginated-list.dto";

@Injectable()
export class UsersDao extends BaseDao<User> {
  protected tableName: string = 'users';
  
  constructor(
    datastore: Datastore
  ) {
    super(datastore, User);
  }

  async findAll(params: {
    filters?: FilterUserDto;
    pagination?: PaginationDto;
  }): Promise<PaginatedListDto<User>> {
    return super.findAll({
      ...params,
      filterIdsAction: (entity: User) => {
        const { emails } = params.filters;
        if (emails && !emails.includes(entity.getEmail())) return false;
        return true;
      },
      queryFilterAction: (query: Query) => {
        if (params.filters.emails) query.filter(
          new PropertyFilter("email", "IN", params.filters.emails)
        );
      }
    });
  }

}