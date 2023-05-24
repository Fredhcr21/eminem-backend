import express from 'express';
import { AuthController } from '../controllers';

export default express.Router().get('/login', AuthController.login);
