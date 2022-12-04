import { userService } from "../User";
import AppDataSource from "../Database/DataSource";
import FriendsController from "./FriendShip.controller";
import FriendShip from "./FriendShip.entity";
import FriendsService from "./FriendShip.service";

const repository = AppDataSource.getRepository<FriendShip>(FriendShip);
const friendShipService: FriendsService = new FriendsService(repository);
const friendShipController: FriendsController = new FriendsController(friendShipService, userService);

export { friendShipService, friendShipController };
