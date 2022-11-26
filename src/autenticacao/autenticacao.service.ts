import StatusCode from "status-code-enum";
import ResponseLogin from "../types/ResponseLogin";
import Usuario from "../usuario/usuario.entity";
import UsuarioService from "../usuario/usuario.service";
import { UsuarioLogin } from "./usuarioLogin";

export default class AutenticacaoService {
  constructor(private readonly usuarioService: UsuarioService) {}
  async Login(usuarioLogin: UsuarioLogin): Promise<ResponseLogin> {
    const usuario = (await this.usuarioService.FindOneByName(usuarioLogin.Login)) as Usuario;
    if (!usuario) return { statusCode: StatusCode.ClientErrorNotFound, message: "Usuário não existe" };
    if (usuario.Senha != usuarioLogin.Senha) return { statusCode: StatusCode.ClientErrorBadRequest, message: "Senha incorreta" };
    return { statusCode: StatusCode.SuccessAccepted, id: usuario.id, message: "Usuário autenticado com sucesso" };
  }
}
