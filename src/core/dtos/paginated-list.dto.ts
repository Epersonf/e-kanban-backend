export class PaginatedListDto<T> {
  items: T[];

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
}
