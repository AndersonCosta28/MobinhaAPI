import { Request, Response, Router } from "express";
import StatusCode from "status-code-enum";
import User from "./user.entity";
import UserService from "./user.service";

export default class UserController {
  constructor(private readonly service: UserService) {}

  Routers(): Router {
    const router: Router = Router();
    router.get("/", this.FindAll.bind(this));
    router.get("/:id", this.FindOneById.bind(this));
    router.post("/", this.Create.bind(this));
    router.put("/:id", this.Update.bind(this));
    router.delete("/:id", this.Delete.bind(this));
    return router;
  }

  async FindAll(request: Request, response: Response): Promise<Response> {
    try {
      return response.status(StatusCode.SuccessOK).send(await this.service.FindAll());
    } catch (error: any) {
      
      return response.status(StatusCode.ClientErrorBadRequest).json({message: error.message});
    }
  }

  async FindOneById(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      return response.status(StatusCode.SuccessOK).send(await this.service.FindOneById(Number(id)));
    } catch (error: any) {
      return response.status(StatusCode.ClientErrorBadRequest).json({message: error.message});
    }
  }

  async Create(request: Request, response: Response): Promise<Response> {
    try {
      const model = request.body;
      return response.status(StatusCode.SuccessOK).send(await this.service.Create(model));
    } catch (error: any) {
      return response.status(StatusCode.ClientErrorBadRequest).json({message: error.message});
    }
  }

  async Update(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const model = request.body;
      return response.status(StatusCode.SuccessOK).send(await this.service.Update(Number(id), model));
    } catch (error: any) {
      return response.status(StatusCode.ClientErrorBadRequest).json({message: error.message});
    }
  }

  async Delete(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      return response.status(StatusCode.SuccessOK).send(await this.service.Delete(Number(id)));
    } catch (error: any) {
      return response.status(StatusCode.ClientErrorBadRequest).json({message: error.message});
    }
  }
}
