import { TypeOfFriendShip } from "../Types/FriendShip";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class FriendShip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, default: 0 })
  SourceId: number;

  @Column({ nullable: false, default: 0 })
  TargetId: number;

  @Column({
    type: "enum",
    enum: TypeOfFriendShip,
    default: TypeOfFriendShip.requested,
  })
  Type: TypeOfFriendShip;
}
