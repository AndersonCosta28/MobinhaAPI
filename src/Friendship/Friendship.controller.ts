import { ICreateBodyRequest, IFindAllByUserBodyRequest, IReactToFriendRequestBodyRequest, TypeOfFriendship } from "Types/Friendship"
import { Request, Response, Router } from "express"
import { StatusCode } from "status-code-enum"
import { IFriendshipService } from "./Friendship.service"
import IController from "Types/IController"
import AppDataSource from "Providers/Database/DataSource"
import Profile from "Profile/Profile.entity"

export interface IFriendshipController extends IController {
	create: (request: Request, response: Response) => Promise<Response>
	findAllByProfile: (request: Request, response: Response) => Promise<Response>
	reactToFriendRequest: (request: Request, response: Response) => Promise<Response>
}

export default class FriendshipController implements IFriendshipController {
	constructor(private readonly service: IFriendshipService) { }

	routers = (): Router => {
		const router: Router = Router()
		router.post("/", this.findAllByProfile)
		router.post("/add", this.create)
		router.post("/ReactToFriendRequest", this.reactToFriendRequest)
		router.post("/RemoveFriend", this.removeFriend)
		return router
	}

	create = async (request: Request, response: Response): Promise<Response> => {
		const { ProfileTargetName, ProfileSourceId } = request.body as ICreateBodyRequest
		const profileTarget = await AppDataSource.getRepository(Profile)
			.createQueryBuilder("profile")
			.where("LOWER(Nickname) = :nickname", { nickname: ProfileTargetName.toLowerCase() })
			.getOne()
		if (!profileTarget) throw new Error("Profile not found")
		if (profileTarget.id === Number(ProfileSourceId)) return response.status(StatusCode.ClientErrorBadRequest).json({ message: "You cannot add yourself" })

		const friendship = await this.service.findOneByProfilesId(ProfileSourceId, profileTarget.id)
		if (friendship !== null)
			if (friendship.Type === TypeOfFriendship.Removed) return response.status(StatusCode.SuccessNoContent).send(await this.service.updateTypeFriendship(friendship, TypeOfFriendship.Requested))
			else return response.status(StatusCode.ClientErrorConflict).json({ message: "Already exists" })
		else
			return response.status(StatusCode.SuccessNoContent).send(await this.service.createFriendshipRequest(Number(ProfileSourceId), profileTarget.id))
	}

	findAllByProfile = async (request: Request, response: Response): Promise<Response> => {
		const { ProfileId } = request.body as IFindAllByUserBodyRequest
		return response.status(StatusCode.SuccessOK).send(await this.service.findAllByProfile(Number(ProfileId)))
	}

	reactToFriendRequest = async (request: Request, response: Response): Promise<Response> => {
		const { FriendshipId, React, ProfileId } = request.body as IReactToFriendRequestBodyRequest
		return response.status(StatusCode.SuccessOK).send(await this.service.reactToFriendRequest(React, Number(ProfileId), Number(FriendshipId)))
	}

	removeFriend = async (request: Request, response: Response): Promise<Response> => {
		const { IdFriendship } = request.body
		return response.status(StatusCode.SuccessOK).send(await this.service.remove(IdFriendship))
	}
}
