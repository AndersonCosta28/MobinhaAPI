import ServiceBase from "../Base/ServiceBase";
import Player from "./player.entity.js";

export default class PlayerService extends ServiceBase {
    constructor() {
        super();
        this.repository = this.dataSource.getRepository<Player>(Player);
    }
}