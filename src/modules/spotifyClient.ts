import SpotifyWebApi from 'spotify-web-api-node';
require('dotenv').config();

export const scopes = ['user-read-private', 'user-read-email', 'user-top-read'];

export const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.CALLBACK_URL,
});
