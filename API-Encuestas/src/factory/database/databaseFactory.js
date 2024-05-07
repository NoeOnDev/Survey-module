import sequelize from "../../config/sequelizeConfig.js";
import DatabaseManager from "../../database/database.js";

const databaseManager = new DatabaseManager(sequelize);
export default databaseManager;