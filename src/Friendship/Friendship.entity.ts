import { TypeOfFriendship } from "@Types/Friendship";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "../User/user.entity";

@Entity()
export default class Friendship {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  // @Column({ nullable: false, default: 0 })
  UserSource: User;

  @ManyToOne(() => User, (user) => user.id)
  // @Column({ nullable: false, default: 0 })
  UserTarget: User;

  @Column({
    type: "enum",
    enum: TypeOfFriendship,
    default: TypeOfFriendship.requested,
  })
  Type: TypeOfFriendship;
}
