import express from 'express';
import { isAuth } from '../config/isAuthMiddleware';
import { home, me } from '../controllers/homeController';

export const homeRouter = express.Router();

homeRouter.get('/', isAuth, home);

homeRouter.get('/me', isAuth, me);
