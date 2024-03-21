import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { sequelize } from '../database/db.config.js';

export async function server() {
    try {
        const app = express();
        const PORT = process.env.PORT;

        await sequelize.authenticate();
        await sequelize.sync({ force: true });

        app.use(cors());
        app.use(morgan('dev'));
        app.use(express.json());
        
        app.listen(PORT);
    } catch (error) {
        console.error('Error: ', error);
    }
}