import Controller from "../types/Controller";
import UsuarioService from "./usuario.service";
import { Router } from "express";

export default class UsuarioController extends Controller {
  constructor(service: UsuarioService) {
    super();
    this.service = service;
  }

  Routers(): Router {
    const router: Router = Router();
    router.get("/", this.FindAll.bind(this));
    router.get("/:id", this.FindOneById.bind(this));
    router.post("/", this.Create.bind(this));
    router.put("/", this.Update.bind(this));
    router.delete("/:id", this.Delete.bind(this));
    return router;
  }
}
