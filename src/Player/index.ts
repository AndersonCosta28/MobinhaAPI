import PlayerController from "./player.controller";
import PlayerService from "./player.service";

const playerService: PlayerService = new PlayerService();
const playerController: PlayerController = new PlayerController(playerService);

export { playerService, playerController };
