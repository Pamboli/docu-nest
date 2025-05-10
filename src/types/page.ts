export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;

export type Params = Promise<{ slug: string }>;

export type OrderBy<T> = Partial<Record<keyof T, "asc" | "desc">>;

export type ListParams<T> = {
  page: number;
  orderBy?: OrderBy<T>;
  itemsPerPage: number;
  query?: string;
};
