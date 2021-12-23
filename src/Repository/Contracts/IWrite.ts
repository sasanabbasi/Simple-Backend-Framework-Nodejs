export interface IWrite<T> {
  create: (item: T) => any;
  update: (id: any, item: T) => any;
  delete: (_id: any) => any;
}
