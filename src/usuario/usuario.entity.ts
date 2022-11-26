import { Entity, Column } from "typeorm";
import { Model } from "../types/Model";

@Entity()
export default class Usuario extends Model{

  @Column()
  Login: string;

  @Column()
  Senha: string;
}
