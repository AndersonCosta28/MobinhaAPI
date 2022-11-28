import Relationship from "../Relationship/Relationship.entity";
import User from "../User/user.entity";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "mysql",
  url: "mysql://root:mysqlpw@localhost:55000",
  database: "Mobinha",
  synchronize: true,
  entities: [User, Relationship],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
export default AppDataSource;
