import ControllerBase from "../Base/ControllerBase"; 
import UsuarioService from "./usuario.service";

export default class UsuarioController extends ControllerBase {
  constructor(service: UsuarioService) {
    super();
    this.service = service;
  }
}
