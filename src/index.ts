import 'module-alias/register';
import 'reflect-metadata'
import app from "./server";
app.listen(3001, () => console.log("MobinhaAPI iniciado na porta 3001"));