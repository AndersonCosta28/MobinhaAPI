import AppDataSource from "../Database/DataSource";
import { Repository } from "typeorm";
import UserController from "./user.controller";
import User from "./user.entity";
import UserService from "./user.service";

const repository: Repository<User> = AppDataSource.getRepository<User>(User);
const userService:UserService  = new UserService(repository);
const userController: UserController = new UserController(userService);
export { userService, userController };