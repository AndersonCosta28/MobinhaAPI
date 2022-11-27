import AppDataSource from "../Database/DataSource";
import ServiceBase from "../Base/ServiceBase";
import User from "./user.entity";
import { ModelBase } from "../Types/ModelBase";

export default class UserService extends ServiceBase {
  constructor() {
    super();
    this.repository = AppDataSource.getRepository<User>(User);
  }

  async FindOneByName(nome: string): Promise<User | null | ModelBase> {
    return await this.repository.findOneBy({ Login: nome });
  }
}
