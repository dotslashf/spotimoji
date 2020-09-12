import { Response, Request } from 'express';
import { spotifyApi } from '../modules/spotifyClient';
import { track2Emoji } from '../modules/translateEmoji';

export const me = async (req: Request, res: Response) => {
  try {
    const me = await spotifyApi.getMe();
    res.status(200).send(me.body);
  } catch (err) {
    console.log('Err me: ', err);
    res.status(400).send(err);
  }
};

export const home = async (req: Request, res: Response) => {
  try {
    const topTracksParsed: String[] = [];
    const topTracks = (await spotifyApi.getPlaylist('6oAWxWKLn3FxvjfKKU1cs8'))
      .body.tracks.items;

    await Promise.all(
      topTracks.map(async track => {
        let t = new track2Emoji(track.track.name, track.track.artists[0].name);
        topTracksParsed.push(await t.returnEmoji());
      })
    );
    res.status(200).send(topTracksParsed);
  } catch (err) {
    console.log('Err home', err);
    res.status(400).send(err);
  }
};
