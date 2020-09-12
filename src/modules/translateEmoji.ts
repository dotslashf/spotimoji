const translateEmoji = require('moji-translate');
const translation = require('translate');
require('dotenv').config();

translation.engine = 'google';
translation.key = process.env.TRANSLATE_KEY;
translation.from = 'id';

export class track2Emoji {
  trackTitle: String;
  trackArtist: String;

  constructor(track: String, artist: String) {
    this.trackTitle = track;
    this.trackArtist = artist;
  }

  translateToEn(text: String) {
    return translation(text, { to: 'en' });
  }

  async returnEmoji(): Promise<String> {
    const trackTitle = await this.translateToEn(this.trackTitle);
    const trackArtist = await this.translateToEn(this.trackArtist);
    const track = `${translateEmoji.translate(
      trackTitle,
      ''
    )}-${translateEmoji.translate(trackArtist, '')}`;
    return track;
  }
}
