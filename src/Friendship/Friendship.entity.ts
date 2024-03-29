import { TypeOfFriendship } from "Types/Friendship" 
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import Profile from "Profile/Profile.entity"

@Entity()
export default class Friendship {
	@PrimaryGeneratedColumn()
		id: number

	@ManyToOne(() => Profile, (profile) => profile.Id, { eager: true })
		Source: Profile

	@ManyToOne(() => Profile, (profile) => profile.Id, { eager: true })
		Target: Profile

	@Column({ type: "enum", enum: TypeOfFriendship, default: TypeOfFriendship.Requested })
		Type: TypeOfFriendship | string

	friendProfile?: Profile
}
