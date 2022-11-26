import UsuarioController from "./usuario.controller";
import UsuarioService from "./usuario.service";

const usuarioService: UsuarioService = new UsuarioService();
const usuarioController: UsuarioController = new UsuarioController(usuarioService);
export { usuarioService, usuarioController };
