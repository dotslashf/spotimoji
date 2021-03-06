import { sign } from 'jsonwebtoken';

export const createToken = (accessToken: String, refreshToken: String) => {
  return sign({ accessToken, refreshToken }, process.env.TOKEN_SECRET!, {
    expiresIn: '1d',
  });
};
