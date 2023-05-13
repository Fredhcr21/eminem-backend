export interface PaginationQuery {
  sort: string;
  skip: number;
  limit: number;
}

export interface ResponsePagination<T> {
  items: T[];
  totalCount: number;
}
