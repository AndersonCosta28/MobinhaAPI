import { Entity, Column, BeforeUpdate, BeforeInsert, OneToOne, JoinColumn } from "typeorm";
import { ModelBase } from "../Types/ModelBase";
import bcrypt from "bcrypt";
import Player from "../Player/player.entity";

@Entity()
export default class User extends ModelBase {
  @Column({ unique: true })
  Login: string;

  @Column()
  Password: string;

  @OneToOne(() => Player, { cascade: true, eager: true })
  @JoinColumn()
  Player: Player;

  @BeforeInsert()
  async BeforeInsert() {
    this.Login = this.Login.toLowerCase();
    this.Password = await bcrypt.hash(this.Password, 10);
  }

  @BeforeUpdate()
  async BeforeUpdate() {
    this.Login = this.Login.toLowerCase();
    this.Password = await bcrypt.hash(this.Password, 10);
  }
}
