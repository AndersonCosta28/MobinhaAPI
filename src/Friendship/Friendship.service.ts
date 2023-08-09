import { Repository } from "typeorm"
import Friendship from "./Friendship.entity"
import { IFriend, FriendshipRequestType, TypeOfFriendship } from "Types/Friendship"
import { CustomErrorAPI } from "Types/CustomErrors"

export interface IFriendshipService {
	findAllByProfile: (idProfile: number) => Promise<IFriend[]>
	findOneById: (id: number) => Promise<Friendship>
	findOneByProfilesId: (idSource: number, idTarget: number) => Promise<Friendship | null>
	createFriendshipRequest: (profileSource: number, profileTarget: number) => Promise<void>
	reactToFriendRequest: (react: boolean, userId: number, friendId: number) => Promise<void>
	remove: (id: number) => Promise<void>
	updateTypeFriendship: (friendship: Friendship, type: TypeOfFriendship) => Promise<void>
}

export default class FriendshipService implements IFriendshipService {
	constructor(private readonly repository: Repository<Friendship>) { }

	findAllByProfile = async (idProfile: number): Promise<IFriend[]> => {
		const friendList: IFriend[] = []
		const friendships: Friendship[] = await this.repository.find({
			select: {
				Source: {
					Id: true,
					Nickname: true,
				},
				Target: {
					Id: true,
					Nickname: true,
				},
			},
			where: [{ Source: { Id: idProfile } }, { Target: { Id: idProfile } }],
		})

		for (const friendship of friendships) {
			const friendProfile = friendship.Source.Id === idProfile ? friendship.Target : friendship.Source
			friendList.push({
				FriendshipId: friendship.id,
				Type: friendship.Type,
				FriendshipRequestType: friendship.Source.Id === idProfile ? FriendshipRequestType.Sent : FriendshipRequestType.Received,
				FriendProfile: {
					...friendProfile,
					Description: friendProfile.Description ?? "",
				}
			})
		}

		return friendList
	}

	createFriendshipRequest = async (userSource: number, userTarget: number): Promise<void> => {
		const friendShip: Friendship = this.repository.create({
			Source: { Id: userSource },
			Target: { Id: userTarget },
			Type: TypeOfFriendship.Requested,
		})
		await this.repository.save(friendShip)
	}

	updateTypeFriendship = async (friendship: Friendship, type: TypeOfFriendship): Promise<void> => {
		friendship.Type = type
		const friendshipCreated = this.repository.create(friendship)
		await this.repository.save(friendshipCreated)
	}

	reactToFriendRequest = async (react: boolean, ProfileId: number, friendShipId: number): Promise<void> => {
		const friendship = await this.findOneById(friendShipId)
		if (friendship.Target.Id !== ProfileId && react) throw new CustomErrorAPI("Only the recipient can react to the request")
		if (react) await this.updateTypeFriendship(friendship, TypeOfFriendship.Friend)
		else await this.repository.delete(friendShipId)
	}

	findOneById = async (id: number): Promise<Friendship> => {
		const result: Friendship | null = await this.repository.findOne({
			where: { id }, relations: {
				Source: true,
				Target: true
			}
		})
		if (result === null) throw new CustomErrorAPI("Friendship not found")
		return result
	}

	findOneByProfilesId = async (idSource: number, idTarget: number): Promise<Friendship | null> => {
		const friendship: Friendship | null = await this.repository.findOneBy([
			{ Source: { Id: idSource }, Target: { Id: idTarget } },
			{ Source: { Id: idTarget }, Target: { Id: idSource } },
		])
		return friendship
	}

	remove = async (id: number): Promise<void> => {
		const modelFinded: Friendship | null = await this.findOneById(id)
		await this.repository.remove(modelFinded)
		// modelFinded.Type = TypeOfFriendship.Removed
		// await this.repository.save(modelFinded)
	}
}
