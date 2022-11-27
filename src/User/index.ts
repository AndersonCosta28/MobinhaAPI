import UserController from "./user.controller";
import UserService from "./user.service";

const userService:UserService  = new UserService();
const userController: UserController = new UserController(userService);
export { userService, userController };
