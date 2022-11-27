import { Request, Response, Router } from "express";
import IController from "../Types/IController";
import StatusCode from "status-code-enum";
import IService from "../Types/IService";
import { ModelBase } from "../Types/ModelBase";

export default class ControllerBase implements IController {
  protected service: IService<ModelBase>;

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
    } catch (error) {      
      return response.status(StatusCode.ClientErrorBadRequest).send(error);
    }
  }

  async FindOneById(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      return response.status(StatusCode.SuccessOK).send(await this.service.FindOneById(Number(id)));
    } catch (error) {
      return response.status(StatusCode.ClientErrorBadRequest).send(error);
    }
  }

  async Create(request: Request, response: Response): Promise<Response> {
    try {
      const model = request.body;
      return response.status(StatusCode.SuccessOK).send(await this.service.Create(model));
    } catch (error) {
      return response.status(StatusCode.ClientErrorBadRequest).send(error);
    }
  }

  async Update(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const model = request.body;
      return response.status(StatusCode.SuccessOK).send(await this.service.Update(Number(id), model));
    } catch (error) {
      return response.status(StatusCode.ClientErrorBadRequest).send(error);
    }
  }

  async Delete(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      return response.status(StatusCode.SuccessOK).send(await this.service.Delete(Number(id)));
    } catch (error) {
      return response.status(StatusCode.ClientErrorBadRequest).send(error);
    }
  }
}
