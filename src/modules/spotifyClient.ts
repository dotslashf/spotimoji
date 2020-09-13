import SpotifyWebApi from 'spotify-web-api-node';
require('dotenv').config();

export const scopes = ['user-read-private', 'user-read-email', 'user-top-read'];

export const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.CALLBACK_URL,
});

export const getMe = async () => {
  return await spotifyApi.getMe();
};

export const getSpotifyPlaylist = async (spotifyUri: string) => {
  return (await spotifyApi.getPlaylist(spotifyUri)).body.tracks.items;
};

export const getTopTracks = async () => {
  return (await spotifyApi.getMyTopTracks()).body.items;
};

export const listPlaylists = async () => {
  const playlists = (await spotifyApi.getUserPlaylists()).body.items;
  return playlists.map(playlist => {
    return {
      name: playlist.name,
      uri: playlist.uri,
      owner: playlist.owner,
    };
  });
};
