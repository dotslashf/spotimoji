import { TokenContext } from '../types/Token';
import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { spotifyApi } from '../modules/spotifyClient';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session!.token) {
    console.log('Login First');
    return res.redirect('/auth/login');
  }

  const token = verify(
    req.session!.token,
    process.env.TOKEN_SECRET!
  ) as TokenContext;
  console.log(token);
  spotifyApi.setAccessToken(token.accessToken);
  spotifyApi.setRefreshToken(token.refreshToken);
  next();
};
