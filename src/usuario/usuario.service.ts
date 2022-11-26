import AppDataSource from "../Database/DataSource";
import Service from "../types/Services";
import User from "./usuario.entity";

export default class UsuarioService extends Service {
  constructor() {
    super();
    this.repository = AppDataSource.getRepository(User);
  }
}
