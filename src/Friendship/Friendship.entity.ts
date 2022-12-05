import { TypeOfFriendship } from "@Types/Friendship";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Friendship {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, default: 0 })
  SourceId: number;

  @Column({ nullable: false, default: 0 })
  TargetId: number;

  @Column({
    type: "enum",
    enum: TypeOfFriendship,
    default: TypeOfFriendship.requested,
  })
  Type: TypeOfFriendship;
}
