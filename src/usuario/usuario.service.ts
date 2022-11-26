import AppDataSource from "../Database/DataSource";
import ServiceBase from "../Base/ServiceBase";
import Usuario from "./usuario.entity";
import { ModelBase } from "../types/ModelBase";

export default class UsuarioService extends ServiceBase {
  constructor() {
    super();
    this.repository = AppDataSource.getRepository<Usuario>(Usuario);
  }

  async FindOneByName(nome: string): Promise<Usuario | null | ModelBase> {
    return await this.repository.findOneBy({ Login: nome });
  }
}
