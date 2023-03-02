import express, { Request, Response } from "express"
import cors from "cors"
import http from "http"
import "express-async-errors"
import { MiddlewareError } from "./Middleware/Error"
import { profileController } from "./Profile"
import { friendshipController } from "./Friendship"
import { authenticationController } from "./Authentication"
import { userController } from "./User"

const app = express()
const prefix = "/api/v1/"

app.use(express.json())
app.use(cors())

app.get(prefix + "ping", (request: Request, response: Response) => response.send("<b>pong</b>"))
app.use(prefix + "authentication", authenticationController.routers())
app.use(prefix + "user", userController.routers())
app.use(prefix + "friendship", friendshipController.routers())
app.use(prefix + "profile", profileController.routers())
app.use(MiddlewareError) // TODO: https://expressjs.com/en/guide/error-handling.html // Writing error handlers (using next(error in controllers))



const server = http.createServer(app)
export default server
