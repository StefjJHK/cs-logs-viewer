export enum SortOrder {
  Ascending = 'asc',
  Descending = 'des'
}

export interface LogsViewPageFormData {
  order: SortOrder;
  filter?: string;
}
