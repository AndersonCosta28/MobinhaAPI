import StatusCode from "status-code-enum";
import ResponseLogin from "@Types/ResponseLogin";
import User from "../User/user.entity";
import UsuarioService from "../User/user.service";
import { UserLogin } from "./UserLogin";
import bcrypt from "bcrypt";

export default class AuthenticationService {
  constructor(private readonly userService: UsuarioService) {}
  async Login(usuarioLogin: UserLogin): Promise<ResponseLogin> {
    const user = (await this.userService.FindOneByName(usuarioLogin.Login)) as User;
    if (!user) return { Code: StatusCode.ClientErrorNotFound, Message: "Usuário não existe", Authenticated: false };
    if (!(await bcrypt.compare(usuarioLogin.Password, user.Password))) return { Code: StatusCode.ClientErrorBadRequest, Message: "Password incorreta", Authenticated: false };
    return { Code: StatusCode.SuccessAccepted, IdUser: user.id, Message: "Usuário autenticado com sucesso", Authenticated: true, Nickname: user.Nickname, EXP: user.EXP, Level: user.Level };
  }
}
