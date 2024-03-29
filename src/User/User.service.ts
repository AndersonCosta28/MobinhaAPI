import { DeleteResult, Repository, UpdateResult } from "typeorm"
import bcrypt from "bcrypt"
import User from "./User.entity"
import ICrud from "Types/ICrud"
import AppDataSource from "Providers/Database/DataSource"
import { IEmailService } from "Email/Email.service"
import Email from "Email/Email.entity"
import { CustomErrorAPI } from "Types/CustomErrors"
import { EmailTypes } from "Types/Email"
import { UserStates } from "Types/User"

export interface IUserService extends ICrud<User> {
	findOneByName: (name: string, bringPassword?: boolean) => Promise<User | null>
	findOneById: (id: number) => Promise<User>
	activation: (uuid: string) => void
	resendActivationEmail: (uuid: string) => Promise<void>
	sendRedefinePasswordEmail: (emailUser: string) => Promise<void>
	redefinePassword: (email: Email, newPassword: string) => Promise<void>
}

export default class UserService implements IUserService {
	constructor(private readonly repository: Repository<User>, private readonly emailService: IEmailService) { }

	findOneByName = async (name: string, bringPassword = false): Promise<User | null> => {
		const user = await this.repository.findOne({ where: { Login: name.toLowerCase() }, select: {
			Email: true,
			id: true,
			Login: true,
			Password: bringPassword,
			State: true,	
		} })
		if (!user) throw new Error("User not found")
		return user
	}

	findAll = async (): Promise<User[]> => await this.repository.find({
		select: {
			Email: true,
			id: true,
			State: true,
		},
		relations: {
			Profile: true
		},
		// cache: {
		// 	id: "users",
		// 	milliseconds: 60000
		// }
	})

	findOneById = async (id: number): Promise<User> => {
		const user = await this.repository.findOne({ where: { id } })
		if (!user) throw new CustomErrorAPI("User not found", 404)
		return user
	}

	create = async (model: User): Promise<void> => {
		const queryRunner = AppDataSource.createQueryRunner()
		try {
			await queryRunner.connect()
			await queryRunner.startTransaction()
			const modelCreated = this.repository.create(model)
			modelCreated.Profile.Nickname = model.Login			
			const userSave: User = await queryRunner.manager.getRepository(User).save(modelCreated)
			const { emailMessage, newEmail } = this.emailService.prepareActivationEmail(userSave)
			await this.emailService.sendMail(emailMessage)
			await queryRunner.manager.getRepository(Email).save(newEmail)

			await queryRunner.commitTransaction()
		}
		catch (error) {
			await queryRunner.rollbackTransaction()
			throw error
		}
		finally {
			await queryRunner.release()
		}
	}

	update = async (id: number, model: User): Promise<boolean> => {
		const modelFinded: User = await this.findOneById(id)
		const modelCreated = this.repository.create(model)
		modelCreated.Password = await bcrypt.hash(modelCreated.Password, 10)
		const resultUpdate: UpdateResult = await this.repository.update(modelFinded.id, modelCreated)
		return (resultUpdate.affected ?? 0) > 0
	}

	delete = async (id: number): Promise<boolean> => {
		const modelFinded: User = await this.findOneById(id)

		const resultDelete: DeleteResult = await this.repository.delete({ id: modelFinded.id })
		return (resultDelete.affected ?? 0) > 0
	}

	activation = async (uuid: string) => {
		const email: Email | null = await this.emailService.findOneByUUIDAndType(uuid, EmailTypes.Activation)
		if (!email) throw new CustomErrorAPI("Email not found", 404)

		const user: User = await this.findOneById(email.user.id)

		if (Number(email.ExpiresAt) < new Date().getTime() && user.State === UserStates.WaitingForActivation) throw new CustomErrorAPI("The email has expired")

		if (user.State !== UserStates.WaitingForActivation) throw new CustomErrorAPI(`User is ${user.State.toString()}`)

		const modelCreated = this.repository.create(user)
		modelCreated.State = UserStates.Active
		await this.repository.save(modelCreated)
	}

	resendActivationEmail = async (uuid: string): Promise<void> => {
		const queryRunner = AppDataSource.createQueryRunner()
		try {
			const email: Email | null = await this.emailService.findOneByUUIDAndType(uuid, EmailTypes.Activation)
			if (!email) throw new CustomErrorAPI("Email not found", 404)

			const user: User = await this.findOneById(email.user.id)

			if (user.State !== UserStates.WaitingForActivation) throw new CustomErrorAPI(`User is ${user.State.toString()}`)

			await queryRunner.connect()
			await queryRunner.startTransaction()
			const { emailMessage, newEmail } = this.emailService.prepareActivationEmail(user)
			await this.emailService.sendMail(emailMessage)
			await queryRunner.manager.getRepository(Email).update(email.id, newEmail)

			await queryRunner.commitTransaction()
		}
		catch (error) {
			if (queryRunner.isTransactionActive)
				await queryRunner.rollbackTransaction()
			throw error
		}
		finally {
			await queryRunner.release()
		}
	}

	sendRedefinePasswordEmail = async (emailUser: string): Promise<void> => {
		const user: User | null = await this.repository.findOneBy({ Email: emailUser })
		if (!user) throw new CustomErrorAPI("User not found", 404)
		const queryRunner = AppDataSource.createQueryRunner()
		try {
			await queryRunner.connect()
			await queryRunner.startTransaction()
			const emailRepository = queryRunner.manager.getRepository(Email)
			const { emailMessage, newEmail } = this.emailService.prepareRedefinePasswordEmail(user)
			await this.emailService.sendMail(emailMessage)
			const email: Email | null = await emailRepository.findOneBy({ user: { id: user.id }, type: EmailTypes.RedefinePassword.toString() })
			if (email)
				await emailRepository.update(email.id, newEmail)
			else
				await emailRepository.save(newEmail)

			await queryRunner.commitTransaction()
		}
		catch (error) {
			if (queryRunner.isTransactionActive)
				await queryRunner.rollbackTransaction()
			throw error
		}
		finally {
			await queryRunner.release()
		}
	}

	redefinePassword = async (email: Email, newPassword: string): Promise<void> => {
		const queryRunner = AppDataSource.createQueryRunner()

		try {
			await queryRunner.connect()
			await queryRunner.startTransaction()
			const emailRepository = queryRunner.manager.getRepository(Email)
			const userRepository = queryRunner.manager.getRepository(User)

			const user: User | null = await userRepository.findOneBy({ id: email.user.id })
			if (!user) throw new CustomErrorAPI("User not found", 404)

			if (await bcrypt.compare(newPassword, user.Password)) throw new CustomErrorAPI("Password cannot be the same", 400)

			const userCreated = userRepository.create(user)
			userCreated.Password = await bcrypt.hash(newPassword, 10)
			await userRepository.update(user.id, userCreated)
			await emailRepository.delete(email.id)

			await queryRunner.commitTransaction()
		}
		catch (error) {
			if (queryRunner.isTransactionActive)
				await queryRunner.rollbackTransaction()
			throw error
		}
		finally {
			await queryRunner.release()
		}
	}
}
