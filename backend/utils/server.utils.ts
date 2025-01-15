import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { routes } from '../routes/routes';

function createServer() {
  const app: Express = express();

  app.use(cors({
    origin: process.env.ORIGIN, // tell browser to accept request from this endpoint
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposedHeaders: ['x-access-token'], // tell the browser which response headers could be read by scripts
    allowedHeaders: ["Content-Type"]
  }));

  app.use(bodyParser.json());

  routes(app);

  return app;
}

export { createServer };