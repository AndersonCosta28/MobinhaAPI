import { DataSource } from "typeorm";
import User from "../User/user.entity";

const AppDataSource = new DataSource({
  type: "sqlite",
  database: "app.db",
  synchronize: true,
  entities: [User]
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
export default AppDataSource;