import Email from "Email/Email.entity"
import Friendship from "Friendship/Friendship.entity"
import Profile from "Profile/Profile.entity"
import User from "User/User.entity"
import { DataSource } from "typeorm"
import { getErrorMessage } from "utils"

const AppDataSource = new DataSource({
	type: "mysql",
	host: process.env.DATABASE_HOST,
	port: Number(process.env.DATABASE_PORT),
	username: process.env.DATABASE_USERNAME,
	password: process.env.DATABASE_PASSWORD,
	database: "mobinhaapi",
	entities: [User, Friendship, Email, Profile],
	synchronize: true,
	
})

AppDataSource.initialize()
	.then(() => {
		console.log("Data Source has been initialized!")
	})
	.catch((err) => {
		console.error("Error during Data Source initialization", getErrorMessage(err))
	})
export default AppDataSource
