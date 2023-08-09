import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export default class Profile {
	@PrimaryGeneratedColumn()
		Id: number

	@Column({ nullable: false, unique: true })
		Nickname: string

	@Column({ default: "" })
		Description?: string
}