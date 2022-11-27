export default interface IService<M> {
  FindAll(): Promise<M[] | []>;
  FindOneById(id: number): Promise<M | null>;
  Create(model: M): Promise<M>;
  Update(id: number, model: M): Promise<boolean>;
  Delete(id: number): Promise<boolean>;
}
