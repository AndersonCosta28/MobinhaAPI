import StatusCode from "status-code-enum";
import ResponseLogin from "../Types/ResponseLogin";
import User from "../User/user.entity";
import UsuarioService from "../User/user.service";
import { UserLogin } from "./UserLogin";
import bcrypt from "bcrypt";

export default class AuthenticationService {
  constructor(private readonly userService: UsuarioService) {}
  async Login(usuarioLogin: UserLogin): Promise<ResponseLogin> {
    const user = (await this.userService.FindOneByName(usuarioLogin.Login)) as User;
    if (!user) return { statusCode: StatusCode.ClientErrorNotFound, message: "Usuário não existe", authenticated: false};
    if (!(await bcrypt.compare(usuarioLogin.Password, user.Password))) return { statusCode: StatusCode.ClientErrorBadRequest, message: "Password incorreta", authenticated: false };
    return { statusCode: StatusCode.SuccessAccepted, id: user.id, message: "Usuário autenticado com sucesso", authenticated: true };
  }
}
