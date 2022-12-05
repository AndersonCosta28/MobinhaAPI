import { CreateBodyRequest, FindAllByUserBodyRequest, ReactToFriendRequestBodyRequest } from "@Types/Friendship";
import { Request, Response, Router } from "express";
import StatusCode from "status-code-enum";
import UserService from "User/user.service";
import FriendsService from "./Friendship.service";

export default class FriendshipController {
  constructor(private readonly service: FriendsService, private readonly userService: UserService) {}

  Routers(): Router {
    const router: Router = Router();
    router.get("/", this.FindAllByUser.bind(this));
    router.post("/", this.Create.bind(this));
    router.post("/ReactToFriendRequest", this.ReactToFriendRequest.bind(this));
    return router;
  }

  async Create(request: Request, response: Response): Promise<Response> {
    console.log(request.body);
    try {
      const { TargetName, SourceId } = request.body as CreateBodyRequest;
      const userTarget = await this.userService.FindOneByName(TargetName);
      if (!userTarget) return response.status(StatusCode.ClientErrorNotFound).end();
      if (userTarget.id == SourceId) return response.status(StatusCode.ClientErrorBadRequest).json({ message: "You cannot add yourself" });
      if (await this.service.CheckIfItAlreadyExists(SourceId, userTarget.id)) return response.status(StatusCode.ClientErrorConflict).json({ message: "Already exists" });
      this.service.CreateFriendshipRequest(Number(SourceId), userTarget.id);
      return response.status(StatusCode.SuccessOK).send();
    } catch (error: any) {
      return response.status(StatusCode.ClientErrorBadRequest).json({ message: error.message });
    }
  }

  async FindAllByUser(request: Request, response: Response): Promise<Response> {
    try {
      const { UserId } = request.body as FindAllByUserBodyRequest;
      return response.status(StatusCode.SuccessOK).send(await this.service.FindAllByUser(Number(UserId)));
    } catch (error: any) {
      return response.status(StatusCode.ClientErrorBadRequest).json({ message: error.message });
    }
  }

  async ReactToFriendRequest(request: Request, response: Response): Promise<Response> {
    try {
      const { FriendId, React, UserId } = request.body as ReactToFriendRequestBodyRequest;
      return response.status(StatusCode.SuccessOK).send(await this.service.ReactToFriendRequest(React, Number(UserId), Number(FriendId)));
    } catch (error: any) {
      return response.status(StatusCode.ClientErrorBadRequest).json({ message: error.message });
    }
  }

  /*  async FindOneById(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      return response.status(StatusCode.SuccessOK).send(await this.service.FindOneById(Number(id)));
    } catch (error: any) {
      return response.status(StatusCode.ClientErrorBadRequest).json({ message: error.message });
    }
  }

  // async Create(request: Request, response: Response): Promise<Response> {
  //   try {
  //     const model = request.body;
  //     return response.status(StatusCode.SuccessOK).send(await this.service.Create(model));
  //   } catch (error: any) {
  //     return response.status(StatusCode.ClientErrorBadRequest).json({ message: error.message });
  //   }
  // }

  async Update(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const model = request.body;
      return response.status(StatusCode.SuccessOK).send(await this.service.Update(Number(id), model));
    } catch (error: any) {
      return response.status(StatusCode.ClientErrorBadRequest).json({ message: error.message });
    }
  }

  async Delete(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      return response.status(StatusCode.SuccessOK).send(await this.service.Delete(Number(id)));
    } catch (error: any) {
      return response.status(StatusCode.ClientErrorBadRequest).json({ message: error.message });
    }
  }*/
}
