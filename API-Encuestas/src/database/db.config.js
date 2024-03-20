import { Sequelize } from 'sequelize';

process.loadEnvFile();

const  { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

export const sequelize = new Sequelize( DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
    logging: false
});