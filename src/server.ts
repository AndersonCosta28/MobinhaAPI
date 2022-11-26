import express from "express";
import { autenticacaoController } from "./autenticacao";
import { usuarioController } from "./usuario";

const app = express();

app.use(express.json());
app.use("/usuario", usuarioController.Routers());
app.use("/autenticacao", autenticacaoController.Routes())

export default app;
