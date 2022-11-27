import ControllerBase from "../Base/ControllerBase";
import PlayerService from "./player.service";

export default class PlayerController extends ControllerBase{
    /**
     *
     */
    constructor(service: PlayerService) {
        super();
        this.service = service;
    }
}