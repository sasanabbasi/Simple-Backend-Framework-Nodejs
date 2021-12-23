export interface IRead<T> {
  find: (query: any, aggregates?: any) => any;
  findOne: (query: any) => any;
}
