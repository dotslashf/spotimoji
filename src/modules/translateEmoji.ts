const translateEmoji = require('moji-translate');
const translation = require('translate');
const checkWord = require('check-word');

const words = checkWord('en');

require('dotenv').config();

translation.engine = 'google';
translation.key = process.env.TRANSLATE_KEY;
translation.from = 'id';

export class track2Emoji {
  trackTitle: String[];
  trackArtist: String[];

  constructor(track: String, artist: String) {
    this.trackTitle = track.split(' ');
    this.trackArtist = artist.split(' ');
  }

  translateToEn(word: String): String {
    return translation(word, { to: 'en' });
  }

  isWordinEn(word: String): Boolean {
    if (words.check(word.toLowerCase)) {
      return true;
    } else {
      return false;
    }
  }

  async returnEmoji(): Promise<Object> {
    const originalTitle: String = this.trackTitle.join(' ');
    const originalArtists: String = this.trackArtist.join(' ');

    await Promise.all(
      this.trackTitle.map(async (word, i) => {
        if (!this.isWordinEn(word)) {
          const newWord = this.translateToEn(word);
          const emoji = translateEmoji.getEmojiForWord(newWord);

          if (!emoji) {
            this.trackTitle[i] = word;
          } else {
            this.trackTitle[i] = emoji;
          }
        }
      })
    );

    await Promise.all(
      this.trackArtist.map(async (word, i) => {
        const newWord = this.translateToEn(word);
        const emoji = translateEmoji.getEmojiForWord(newWord);

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
