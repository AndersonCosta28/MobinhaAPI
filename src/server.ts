import express from "express";
import { usuarioController } from "./usuario";

const app = express();
app.use(express.json());
app.use("/usuario", usuarioController.Routers());

export default app;
