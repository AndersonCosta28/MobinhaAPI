import express from "express";
import { authenticationController } from "./Authentication";
import { userController } from "./User"; 
const app = express();

app.use(express.json());
app.use("/user", userController.Routers());
app.use("/authentication", authenticationController.Routes())

export default app;
