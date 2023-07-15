export interface List<DataType> {
  items: DataType[];
  total: number;
  pageSize: number;
  current: number;
}
