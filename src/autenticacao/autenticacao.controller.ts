import { Request, Response, Router } from "express";
import AutenticacaoService from "./autenticacao.service";
import { UsuarioLogin } from "./usuarioLogin";

export default class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}

  async Login(request: Request, response: Response) {
    const usuarioLogin: UsuarioLogin = request.body;
    const retornoDoLogin = await this.autenticacaoService.Login(usuarioLogin);
    return response.status(retornoDoLogin.statusCode).send({ id: retornoDoLogin.id, message: retornoDoLogin.message });
  }

  Routes(): Router {
    const router = Router();
    router.post("/", this.Login.bind(this));
    return router;
  }
}
