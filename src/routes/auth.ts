import { callback, login, logout } from '../controllers/authController';
import express from 'express';

require('dotenv').config();

export const authRouter = express.Router();

authRouter.get('/login', login);

authRouter.get('/logout', logout);

authRouter.get('/callback', callback);
