require('dotenv').config();
const translateEmoji = require('moji-translate');
// const projectId = process.env.GOOGLE_PROJECT_ID;
// const { Translate } = require('@google-cloud/translate').v2;

// const translate = new Translate({ projectId });

export class track2Emoji {
  trackTitle: String[];
  trackArtist: String[];

  constructor(track: String, artist: String) {
    this.trackTitle = track.split(' ');
    this.trackArtist = artist.split(' ');
  }

  async returnEmoji(): Promise<Object> {
    const originalTitle: String = this.trackTitle.join(' ');
    const originalArtists: String = this.trackArtist.join(' ');

    await Promise.all(
      this.trackTitle.map(async (word, i) => {
        // const [newWord] = await translate.translate(word, 'en');
        const emoji = translateEmoji.getEmojiForWord(word);

        if (!emoji) {
          this.trackTitle[i] = word;
        } else {
          this.trackTitle[i] = emoji;
        }
      })
    );

    await Promise.all(
      this.trackArtist.map(async (word, i) => {
        // const [newWord] = await translate.translate(word, 'en');
        const emoji = translateEmoji.getEmojiForWord(word);

        if (!emoji) {
          this.trackArtist[i] = word;
        } else {
          this.trackArtist[i] = emoji;
        }
      })
    );

    return {
      emojified: `${this.trackTitle.join(' ')} - ${this.trackArtist.join(' ')}`,
      original: `${originalTitle} - ${originalArtists}`,
    };
  }
}
