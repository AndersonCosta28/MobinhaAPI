import express from "express";
import { friendshipController } from "./Friendship";
import { authenticationController } from "./Authentication";
import { userController } from "./User"; 
const app = express();

app.use(express.json());
app.use("/user", userController.Routers());
app.use("/authentication", authenticationController.Routers())
app.use('/friendship', friendshipController.Routers())

export default app;
