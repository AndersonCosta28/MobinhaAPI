import ServiceBase from "../Base/ServiceBase";
import User from "./user.entity";
import { ModelBase } from "../Types/ModelBase";

export default class UserService extends ServiceBase {
  constructor() {
    super();
    this.repository = this.dataSource.getRepository<User>(User);
  }

  async FindOneByName(nome: string): Promise<User | null | ModelBase> {
    return await this.repository.findOneBy({ Login: nome });
  }
}
