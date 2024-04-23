import { Sequelize } from "sequelize";

process.loadEnvFile();

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
    logging: false,
});

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("Database connected");
    } catch (error) {
        console.error("Database connection error:", error);
    }
}

async function syncDB() {
    try {
        await sequelize.sync({ force: true });
        console.log("Database synchronized");
    } catch (error) {
        console.error("Database synchronization error:", error);
    }
}

export { sequelize, connectDB, syncDB };