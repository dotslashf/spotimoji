import {
  getPlaylistTracks,
  getMe,
  getTopTracks,
  listPlaylists,
  getPlaylistTracksCount,
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
    const topTracksParsed: Object[] = [];

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
    const playlistTracksParsed: Object[] = [];
    const tracksCount = await getPlaylistTracksCount(req.params.id!);
    if (tracksCount > Number(req.query.limit)) {
      const tracks = await getPlaylistTracks(
        req.params.id!,
        Number(req.query.limit),
        Number(req.query.page)
      );

      await Promise.all(
        tracks.map(async track => {
          let t = new track2Emoji(
            track.track.name,
            track.track.artists[0].name
          );
          playlistTracksParsed.push(await t.returnEmoji());
        })
      );

      res.status(200).send({
        data: playlistTracksParsed,
        count: playlistTracksParsed.length,
      });
    } else {
      const tracks = await getPlaylistTracks(
        req.params.id!,
        Number(req.query.limit),
        1
      );

      await Promise.all(
        tracks.map(async track => {
          let t = new track2Emoji(
            track.track.name,
            track.track.artists[0].name
          );
          playlistTracksParsed.push(await t.returnEmoji());
        })
      );

      res.status(200).send({
        data: playlistTracksParsed,
        count: playlistTracksParsed.length,
      });
    }
  } catch (err) {
    console.log('Err home', err);
    res.status(400).send(err);
  }
};
