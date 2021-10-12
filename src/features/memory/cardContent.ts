import type { Card } from './memorySlice';
import { shuffle } from 'lodash';

const emojies = '🍐 🍊 🍋 🍌 🍉 🍇 🍓 🫐 🍈 🍒 🍑 🥭 🍍 🥥 🥝 🍅 🍆 🥑 ';

export const getCards = (): Card[] => {
  const content: Card[] = emojies
    .repeat(2)
    .split(' ')
    .map((emoji, index) => {
      return {
        id: index + 1,
        value: emoji,
        isActive: false,
      };
    })
    .filter(({ value }) => value !== '');

  return shuffle(content);
};
