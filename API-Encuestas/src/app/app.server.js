import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

export async function server() {
    try {
        const app = express();
        const PORT = process.env.PORT;

        app.use(cors());
        app.use(morgan('dev'));
        app.use(express.json());
        
        app.listen(PORT);
        console.log(PORT);
    } catch (error) {
        console.error('Error: ', error);
    }
}