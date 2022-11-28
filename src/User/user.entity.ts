import { Entity, Column, BeforeUpdate, BeforeInsert, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import bcrypt from "bcrypt";

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  Login: string;

  @Column()
  Password: string;

  @Column({ nullable: false })
  Nickname: string;

  @Column()
  Level: number;

  @Column()
  EXP: number;

  @BeforeInsert()
  async BeforeInsert() {
    this.Login = this.Login.toLowerCase();
    this.Password = await bcrypt.hash(this.Password, 10);
  }
  // Quando atualizarmos o nível ou outra coisa do usuário terá que ser feito endpoints diferente para isso para não ter que Hashear uma senha hash
  // Não foi criado uma outra tabela para isso para não confundir os ID's, por que a relação é de um para um
  /*
  @BeforeUpdate()
  async BeforeUpdate() {
    this.Password = await bcrypt.hash(this.Password, 10);
  }
  */
}
