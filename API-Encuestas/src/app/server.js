import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

export function createServer() {
  const server = express();
    server.use(cors());
    server.use(morgan('dev'));
    server.use(express.json());
    return server;
}