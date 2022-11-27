import ControllerBase from "../Base/ControllerBase"; 
import UserService from "./user.service"; 

export default class UserController extends ControllerBase {
  constructor(service: UserService) {
    super();
    this.service = service;
  }
}
