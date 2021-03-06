import { Response, Request } from 'express';
import { createToken } from '../config/auth';
import { spotifyApi, scopes } from '../modules/spotifyClient';

export const login = (req: Request, res: Response) => {
  const loginUrl = spotifyApi.createAuthorizeURL(scopes, '', true);
  return res.redirect(loginUrl);
};

export const logout = (req: Request, res: Response) => {
  req.session?.destroy(() => {
    console.log('Logout success');
    return res.status(200).send('Logout Success!');
  });
};

export const callback = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const data = await spotifyApi.authorizationCodeGrant(req.query.code);
    // @ts-ignore
    const { access_token, refresh_token } = data.body;
    const token = createToken(access_token, refresh_token);
    const sessionData = req.session!;
    sessionData.token = token;

    res.redirect(process.env.REDIRECT_URL!);
  } catch (err) {
    console.log('Error callback ', err);
    res.status(400).send(err);
  }
};
