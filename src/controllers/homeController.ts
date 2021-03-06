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

    let topTracks = await getTopTracks();

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
    const tracksCount = (await getPlaylistTracksCount(
      req.params.id!
    )) as number;
    let limit = 0;
    let total_page = 0;
    let page = 0;

    if (req.query.limit) {
      limit = parseInt(req.query.limit as string);
      total_page =
        Math.floor(tracksCount / limit) + (tracksCount % limit > 0 ? 1 : 0);
    } else {
      limit = Number(tracksCount);
    }

    if (req.query.page && parseInt(req.query.page as string) <= total_page) {
      page = Number(req.query.page);
    } else if (
      req.query.page &&
      parseInt(req.query.page as string) > total_page
    ) {
      page = total_page;
    }

    const tracks = await getPlaylistTracks(req.params.id!, limit, page);

    await Promise.all(
      tracks.map(async track => {
        let t = new track2Emoji(track.track.name, track.track.artists[0].name);
        playlistTracksParsed.push(await t.returnEmoji());
      })
    );

    res.status(200).send({
      data: playlistTracksParsed,
      pagination: {
        count: playlistTracksParsed.length,
        page: `${page} / ${total_page}`,
        limit: limit,
      },
    });
  } catch (err) {
    console.log('Err home', err);
    res.status(400).send(err);
  }
};
