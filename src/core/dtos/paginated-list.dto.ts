import { ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export declare type Type<T> = new (...args: Array<any>) => T;

export class PaginatedListDto<T> {
  @ApiProperty()
  items: T[];

  @ApiProperty()
  pageCount: number;

  constructor(params: { items: T[]; pageCount: number }) {
    if (!params) return;
    this.items = params.items;
    this.pageCount = params.pageCount;
  }

  static empty<T>(): PaginatedListDto<T> {
    return new PaginatedListDto({
      items: [],
      pageCount: 0,
    });
  }

  static getSchema<T>(itemType: Type<T>): SchemaObject {
    return {
      type: 'object',
      properties: {
        items: {
          type: 'array',
          items: itemType ? { $ref: getSchemaPath(itemType) } : {},
        },
        pageCount: {
          type: 'number',
        },
      },
    };
  }
}
