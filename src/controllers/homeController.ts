import {
  getSpotifyPlaylist,
  getMe,
  getTopTracks,
  listPlaylists,
} from './../modules/spotifyClient';
import { Response, Request } from 'express';
import { track2Emoji } from '../modules/translateEmoji';

export const me = async (req: Request, res: Response) => {
  try {
    const me = await getMe();
    res.status(200).send(me.body);
  } catch (err) {
    console.log('Err me: ', err);
    res.status(400).send(err);
  }
};

export const home = async (req: Request, res: Response) => {
  try {
    const userPlaylists = await listPlaylists();
    res.status(200).send(userPlaylists);
  } catch (err) {
    console.log('Err home', err);
    res.status(400).send(err);
  }
};

export const topTracks = async (req: Request, res: Response) => {
  try {
    const topTracksParsed: String[] = [];

    const topTracks = await getTopTracks();

    await Promise.all(
      topTracks.map(async track => {
        let t = new track2Emoji(track.name, track.artists[0].name);
        topTracksParsed.push(await t.returnEmoji());
      })
    );
    res.status(200).send(topTracksParsed);
  } catch (err) {
    console.log('Err topTracks', err);
    res.status(400).send(err);
  }
};

export const getPlaylists = async (req: Request, res: Response) => {
  try {
    const playlistTracksParsed: String[] = [];

    const playlistTracks = await getSpotifyPlaylist(req.params.id!);

    await Promise.all(
      playlistTracks.map(async track => {
        let t = new track2Emoji(track.track.name, track.track.artists[0].name);
        playlistTracksParsed.push(await t.returnEmoji());
      })
    );
    res.status(200).send(playlistTracksParsed);
  } catch (err) {
    console.log('Err home', err);
    res.status(400).send(err);
  }
};
