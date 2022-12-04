import { DeleteResult, Repository, UpdateResult } from "typeorm";
import User from "./user.entity";

export default class UserService {
  constructor(private readonly repository: Repository<User>) {}

  async FindOneByName(name: string): Promise<User | null> {
    return await this.repository.findOneBy({ Login: name.toLowerCase() });
  }

  async FindAll(): Promise<User[]> {
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

  async FindOneById(id: number): Promise<User | null> {
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

  async Create(model: User): Promise<User> {
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

  async Update(id: number, model: User): Promise<boolean> {
    const modelFinded: User | null = await this.FindOneById(id);
    if (!modelFinded) throw new Error("User não encontrado");

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
    const modelFinded: User | null = await this.FindOneById(id);
    if (!modelFinded != null) throw new Error("User não encontrado");

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
