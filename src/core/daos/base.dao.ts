import { Datastore, Query, Transaction } from "@google-cloud/datastore";
import { Inject, Injectable } from "@nestjs/common";
import { PaginationDto } from "../dtos/pagination.dto";
import { PaginatedListDto } from "../dtos/paginated-list.dto";
import { SerializeUtils } from "../utils/serialize.utils";

export declare type Type<T> = new (...args: Array<any>) => T;

interface FilterBase {
  ids?: string[];
}

interface EntityBase {
  getId(): string;
}

@Injectable()
export abstract class BaseDao<T extends EntityBase> {

  protected abstract tableName: string;

  constructor(
    @Inject(Datastore) protected readonly datastore: Datastore,
    private readonly type: Type<T>,
  ) {}

  async findAll<F extends FilterBase>(params: {
    filterIdsAction?: (entity: T) => boolean;
    queryFilterAction?: (query: Query) => void;
    filters?: F;
    pagination?: PaginationDto,
  }): Promise<PaginatedListDto<T>> {
    if (params.filters?.ids) {
      const keys = params.filters.ids.map(e => this.datastore.key([this.tableName, e]));
      const entities = await this.datastore.get(keys);
      let result = SerializeUtils.serializer.deserializeObjectArray(entities[0], this.type) as T[];

      if (params.filterIdsAction && params.filters) {
        result = result.filter(e => params.filterIdsAction(e));
      }

      return new PaginatedListDto<T>({
        items: result,
        pageCount: 1
      });
    }

    const query = this.datastore.createQuery(this.tableName);
    
    if (params.queryFilterAction && params.filters) {
      params.queryFilterAction(query);
    }

    const aggQuery = this.datastore.createAggregationQuery(query);
    const countRes = await aggQuery.count('count').run();
    const count = countRes[0][0].count;

    if (params.pagination) query.limit(params.pagination.getLimit()).offset(params.pagination.getOffset());

    const entities = await query.run();

    const items = SerializeUtils.serializer.deserializeObjectArray(entities[0], this.type) as T[];

    return new PaginatedListDto({
      items,
      pageCount: params.pagination ? Math.ceil(count / params.pagination.getLimit()) : 1,
    });
  }

  async create(params: {
    entities: T[];
    transaction?: Transaction;
  }): Promise<T[]> {
    const transaction = params.transaction ?? this.datastore.transaction();
    const entities = params.entities.map(e => ({
      key: this.datastore.key([this.tableName, e.getId()]),
      data: SerializeUtils.serializer.serializeObject(e),
    }))
    transaction.save(entities);
    if (!params.transaction) await transaction.commit();
    return params.entities;
  }

  async update(params: {
    entities: T[];
    transaction?: Transaction;
  }): Promise<T[]> {
    const transaction = params.transaction ?? this.datastore.transaction();
    const entities = params.entities.map(e => ({
      key: this.datastore.key([this.tableName, e.getId()]),
      data: SerializeUtils.serializer.serializeObject(e),
    }));
    transaction.update(entities);
    if (!params.transaction) await transaction.commit();
    return params.entities;
  }

  async delete(params: {
    ids: string[];
    transaction?: Transaction;
  }): Promise<string[]> {
    const transaction = params.transaction ?? this.datastore.transaction();
    const keys = params.ids.map(e => this.datastore.key([this.tableName, e]));
    transaction.delete(keys);
    if (!params.transaction) await transaction.commit();
    return params.ids;
  }
  
}