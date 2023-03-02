import { Entity, Column, BeforeInsert, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm"
import bcrypt from "bcrypt"
import { UserStates } from "Types/User"
import Profile from "Profile/Profile.entity"

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  	id: number

  @Column({ unique: true })
  	Login: string

  @Column({ select: false })
  	Password: string

  @Column({ unique: true, nullable: false })
  	Email: string

  @Column({ type: "enum", enum: UserStates, default: UserStates.WaitingForActivation })
  	State: UserStates

  @OneToOne(() => Profile, { cascade: true, eager: true })
  @JoinColumn()
  	Profile: Profile = new Profile()

  // @Column()
  // Level: number

  // @Column()
  // EXP: number

  @BeforeInsert()
  async BeforeInsert() {
  	this.Login = this.Login.toLowerCase().trim()
  	this.Password = await bcrypt.hash(this.Password, 10)
  	this.Email = this.Email.toLowerCase().trim()
  }
}
