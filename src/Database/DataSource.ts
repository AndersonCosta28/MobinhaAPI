import { DataSource } from "typeorm";
import Usuario from "../usuario/usuario.entity";

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "app.db",
  synchronize: true,
  entities: [Usuario]
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
export default AppDataSource;