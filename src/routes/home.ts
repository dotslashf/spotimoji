import express from 'express';
import { isAuth } from '../config/isAuthMiddleware';
import {
  home,
  me,
  topTracks,
  getPlaylists,
} from '../controllers/homeController';

export const homeRouter = express.Router();

homeRouter.get('/', isAuth, home);

homeRouter.get('/me', isAuth, me);

homeRouter.get('/top-tracks', isAuth, topTracks);

homeRouter.get('/playlist/:id', isAuth, getPlaylists);
