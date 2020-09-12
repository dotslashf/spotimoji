import { callback, login } from '../controllers/authController';
import express from 'express';

require('dotenv').config();

export const authRouter = express.Router();

authRouter.get('/login', login);

authRouter.get('/callback', callback);
