import { DeleteResult, Repository, UpdateResult } from "typeorm";
import IService from "@Types/IService";
import Relationship from "./Relationship.entity";

export default class RelationshipService implements IService<Relationship> {
  constructor(private readonly repository: Repository<Relationship>) {}

  async FindAll(): Promise<Relationship[]> {
    try {
      return await this.repository.find();
    } catch (error: any) {
      if (typeof error === "string") throw new Error(error);
      else if (error instanceof Error) throw new Error(error.message);
      else {
        console.log(error);
        throw new Error("Erro não catalogado, verificar o log no servidor");
      }
    }
  }

  async FindOneById(id: number): Promise<Relationship | null> {
    try {
      const result = await this.repository.findOne({ where: { id } });
      return result;
    } catch (error: any) {
      if (typeof error === "string") throw new Error(error);
      else if (error instanceof Error) throw new Error(error.message);
      else {
        console.log(error);
        throw new Error("Erro não catalogado, verificar o log no servidor");
      }
    }
  }

  async Create(model: Relationship): Promise<Relationship> {
    try {
      const modelCreated = this.repository.create(model);
      return await this.repository.save(modelCreated);
    } catch (error: any) {
      if (typeof error === "string") throw new Error(error);
      else if (error instanceof Error) throw new Error(error.message);
      else {
        console.log(error);
        throw new Error("Erro não catalogado, verificar o log no servidor");
      }
    }
  }

  async Update(id: number, model: Relationship): Promise<boolean> {
    const modelFinded: Relationship | null = await this.FindOneById(id);
    if (!modelFinded) throw new Error("Relationship não encontrado");

    try {
      const modelCreated = this.repository.create(model);
      const resultUpdate: UpdateResult = await this.repository.update(id, modelCreated);
      return resultUpdate.affected! > 0;
    } catch (error: any) {
      if (typeof error === "string") throw new Error(error);
      else if (error instanceof Error) throw new Error(error.message);
      else {
        console.log(error);
        throw new Error("Erro não catalogado, verificar o log no servidor");
      }
    }
  }

  async Delete(id: number): Promise<boolean> {
    const modelFinded: Relationship | null = await this.FindOneById(id);
    if (!modelFinded != null) throw new Error("Relationship não encontrado");

    try {
      const resultDelete: DeleteResult = await this.repository.delete({ id: id });
      return resultDelete.affected! > 0;
    } catch (error: any) {
      if (typeof error === "string") throw new Error(error);
      else if (error instanceof Error) throw new Error(error.message);
      else {
        console.log(error);
        throw new Error("Erro não catalogado, verificar o log no servidor");
      }
    }
  }
}
