import { usuarioService } from "../usuario";
import AutenticacaoController from "./autenticacao.controller";
import AutenticacaoService from "./autenticacao.service";

const autenticacaoService: AutenticacaoService = new AutenticacaoService(usuarioService);
const autenticacaoController: AutenticacaoController = new AutenticacaoController(autenticacaoService);

export { autenticacaoService, autenticacaoController };
