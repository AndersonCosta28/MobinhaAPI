import Friendship from "../Friendship/Friendship.entity"; 
import User from "../User/user.entity";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "1234",
  database: "mobinha2",
  entities: [User, Friendship],
  // url: "mysql://root:mysqlpw@localhost:55000", //DOCKER
  synchronize: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
export default AppDataSource;
