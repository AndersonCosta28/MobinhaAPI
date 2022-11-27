import { Column, Entity } from "typeorm";
import { ModelBase } from "../Types/ModelBase";

@Entity()
export default class Player  extends ModelBase{

    @Column({nullable: false})
    Nickname: string;

    @Column()
    Level: number;

    @Column()
    EXP: number;
}