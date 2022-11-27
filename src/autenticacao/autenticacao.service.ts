import StatusCode from "status-code-enum";
import ResponseLogin from "../types/ResponseLogin";
import Usuario from "../usuario/usuario.entity";
import UsuarioService from "../usuario/usuario.service";
import { UsuarioLogin } from "./usuarioLogin";
import bcrypt from "bcrypt";

export default class AutenticacaoService {
  constructor(private readonly usuarioService: UsuarioService) {}
  async Login(usuarioLogin: UsuarioLogin): Promise<ResponseLogin> {
    const usuario = (await this.usuarioService.FindOneByName(usuarioLogin.Login)) as Usuario;
    if (!usuario) return { statusCode: StatusCode.ClientErrorNotFound, message: "Usuário não existe", authenticated: false};
    if (!(await bcrypt.compare(usuarioLogin.Password, usuario.Password))) return { statusCode: StatusCode.ClientErrorBadRequest, message: "Password incorreta", authenticated: false };
    return { statusCode: StatusCode.SuccessAccepted, id: usuario.id, message: "Usuário autenticado com sucesso", authenticated: true };
  }
}
