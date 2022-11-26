import { Entity, Column } from "typeorm";
import { ModelBase } from "../types/ModelBase";

@Entity()
export default class Usuario extends ModelBase {
  @Column()
  Login: string;

  @Column()
  Senha: string;
}
