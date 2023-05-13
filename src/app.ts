import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Config } from './config';
import { connectDatabase } from './core';
import routes from './api/routes';

const app = express();

// Enables the bodyParser.JSON middleware to parse and handle incoming request data in the request body in JSON format.
app.use(bodyParser.json({ limit: Config.app.requestLimit }));

// Enables the bodyParser.urlencoded middleware to parse and handle incoming request data in the request body in form format.
app.use(bodyParser.urlencoded({ extended: true, limit: Config.app.requestLimit }));

// Enable CORS middleware to allow requests from other domains
app.use(cors());

// Connection with the Databse (MongoDB)
connectDatabase();

// Routes
routes(app);

export default app;
