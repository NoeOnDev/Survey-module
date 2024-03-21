import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { sequelize } from '../database/db.config.js';

async function server() {
    try {
        const app = express();
        const PORT = process.env.PORT || 3000;

        await sequelize.authenticate();
        await sequelize.sync({ force: true });

        app.use(cors());
        app.use(morgan('dev'));
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        app.listen(PORT, () => { console.log(`🚀 Server running on http://localhost:${PORT}`); });
    } catch (error) {
        
    }
}

export default server;