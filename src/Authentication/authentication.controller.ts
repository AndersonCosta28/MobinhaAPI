import { Request, Response, Router } from "express";
import AuthenticationService from "./authentication.service";
import { UserLogin } from "./UserLogin";

export default class AuthenticationController {
  constructor(private readonly AuthenticationService: AuthenticationService) {}

  async Login(request: Request, response: Response) {
    const usuarioLogin: UserLogin = request.body;
    const retornoDoLogin = await this.AuthenticationService.Login(usuarioLogin);
    return response.status(retornoDoLogin.statusCode).send({ ...retornoDoLogin });
  }

  Routes(): Router {
    const router = Router();
    router.post("/", this.Login.bind(this));
    return router;
  }
}
