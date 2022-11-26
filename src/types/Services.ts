import { DeleteResult, Repository, UpdateResult } from "typeorm";
import IService from "./IService";
import { Model } from "./Model";


export default class Service implements IService<Model>{
  protected repository: Repository<Model>;

  async FindAll(): Promise<Model[]> {
    try {
      return await this.repository.find();
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async FindOneById(id: number): Promise<Model | null> {
    try {
      const result = await this.repository.findOne({ where: { id } });
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async Create(model: Model): Promise<Model> {
    try {
      const modelCreated = this.repository.create(model);
      return await this.repository.save(modelCreated);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async Update(id: number, model: Model): Promise<boolean> {
    const modelFinded: Model | null = await this.FindOneById(id);
    if (!modelFinded != null) throw new Error("Usuário não encontrado");

    try {
      const modelCreated = this.repository.create(model);
      const resultUpdate: UpdateResult = await this.repository.update(id, modelCreated);
      return resultUpdate.affected! > 0;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async Delete(id: number): Promise<boolean> {
    const modelFinded: Model | null = await this.FindOneById(id);
    if (!modelFinded != null) throw new Error("Usuário não encontrado");

    try {
      const resultDelete: DeleteResult = await this.repository.delete(modelFinded!);
      return resultDelete.affected! > 0;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}