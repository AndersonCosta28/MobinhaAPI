import express from "express";
import { relationshipController } from "./Relationship";
import { authenticationController } from "./Authentication";
import { userController } from "./User"; 
const app = express();

app.use(express.json());
app.use("/user", userController.Routers());
app.use("/authentication", authenticationController.Routers())
app.use('/relationship', relationshipController.Routers())

export default app;
