import { Request, Response, Router } from "express";

export default interface IController {
  FindAll(request: Request, response: Response): Promise<Response>;
  FindOneById(request: Request, response: Response): Promise<Response>;
  Create(request: Request, response: Response): Promise<Response>;
  Update(request: Request, response: Response): Promise<Response>;
  Delete(request: Request, response: Response): Promise<Response>;

  Routers(): Router;
}
