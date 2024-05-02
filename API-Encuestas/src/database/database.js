import { Sequelize } from "sequelize";
import initializeUserModel from "../model/userModel.js";

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

class DatabaseManager {
  constructor() {
    this.sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
      host: DB_HOST,
      port: DB_PORT,
      dialect: "postgres",
      logging: false,
    });

    this.User = initializeUserModel(this.sequelize);
  }

  async authenticate() {
    try {
      await this.sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  async sync() {
    try {
      await this.sequelize.sync({ force: true });
      console.log("All models were synchronized successfully.");
    } catch (error) {
      console.error("Unable to sync the models:", error);
    }
  }
}

export default new DatabaseManager();