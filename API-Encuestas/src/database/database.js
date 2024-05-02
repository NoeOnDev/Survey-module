import initializeUserModel from "../model/userModel.js";

class DatabaseManager {
  constructor(sequelize) {
    this.sequelize = sequelize;
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

export default DatabaseManager;