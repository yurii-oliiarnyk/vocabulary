export type EntityListResponse<T> = {
  data: T[];
  total: number;
  totalPages: number;
  limit: number;
  page: number;
};

export type Entity<T> = T & {
  id: string;
};
