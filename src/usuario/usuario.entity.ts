import { Entity, Column, BeforeUpdate, BeforeInsert } from "typeorm";
import { ModelBase } from "../types/ModelBase";
import bcrypt from "bcrypt";

@Entity()
export default class Usuario extends ModelBase {
  @Column({unique: true})
  Login: string;

  @Column()
  Password: string;

  @BeforeInsert()
  async BeforeInsert()
  {
    this.Login = this.Login.toLowerCase();
    this.Password = await bcrypt.hash(this.Password, 10);
  }

  @BeforeUpdate()
  async BeforeUpdate()
  {
    this.Login = this.Login.toLowerCase();
    this.Password = await bcrypt.hash(this.Password, 10);
  }
}