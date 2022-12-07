import { userService } from "../User";
import AppDataSource from "../Database/DataSource";
import FriendshipController from "./Friendship.controller";
import FriendshipService from "./Friendship.service";
import Friendship from "./Friendship.entity";

const repository = AppDataSource.getRepository<Friendship>(Friendship);
const friendshipService: FriendshipService = new FriendshipService(repository, userService);
const friendshipController: FriendshipController = new FriendshipController(friendshipService, userService);

export { friendshipService, friendshipController };
