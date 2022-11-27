import { DeleteResult, Repository, UpdateResult } from "typeorm";
import IService from "../Types/IService";
import { ModelBase } from "../Types/ModelBase";
import User from "../user/user.entity";


export default class ServiceBase implements IService<ModelBase>{
  protected repository: Repository<ModelBase | User>;

  async FindAll(): Promise<ModelBase[]> {
    try {
      return await this.repository.find();
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async FindOneById(id: number): Promise<ModelBase | null> {
    try {
      const result = await this.repository.findOne({ where: { id } });
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async Create(model: ModelBase): Promise<ModelBase> {
    try {
      const modelCreated = this.repository.create(model);
      return await this.repository.save(modelCreated);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async Update(id: number, model: ModelBase): Promise<boolean> {
    const modelFinded: ModelBase | null = await this.FindOneById(id);
    if (!modelFinded) throw new Error("Usuário não encontrado");

    try {
      const modelCreated = this.repository.create(model);
      const resultUpdate: UpdateResult = await this.repository.update(id, modelCreated);
      return resultUpdate.affected! > 0;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async Delete(id: number): Promise<boolean> {
    const modelFinded: ModelBase | null = await this.FindOneById(id);
    if (!modelFinded != null) throw new Error("Usuário não encontrado");

    try {
      const resultDelete: DeleteResult = await this.repository.delete(modelFinded!);
      return resultDelete.affected! > 0;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}