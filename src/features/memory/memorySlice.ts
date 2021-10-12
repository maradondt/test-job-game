import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { normalize, schema } from 'normalizr';
import { RootState } from '../../app/store';
import { getCards } from './cardContent';

export interface MemoryState {
  status: 'idle' | 'playing' | 'finished';
  cards: Cards;
  ids: number[];
  guessedСards: number[];
  openedСards: number[];
}

type Cards = Record<string, Card>;

export type Card = {
  id: number;
  value: string;
  isActive: boolean;
};

const initialState: MemoryState = {
  status: 'idle',
  cards: {},
  ids: [],
  guessedСards: [],
  openedСards: [],
};

export const memorySlice = createSlice({
  name: 'memory',
  initialState,
  reducers: {
    fillBoard: (state) => {
      const card = new schema.Entity('cards');
      const mySchema = { cards: [card] };
      const normalizedData = normalize({ cards: getCards() }, mySchema);
      const ids: number[] = normalizedData.result.cards;
      const cards: Cards = normalizedData.entities.cards!;
      return {
        ...state,
        cards,
        ids,
      };
    },
    openCard: (state, { payload: { id } }: PayloadAction<{ id: number }>) => {
      if (state.openedСards.includes(id)) {
        return state;
      }
      state.cards[id].isActive = true;
      state.openedСards.push(id);
    },
    closeCard: (state, { payload: { id } }: PayloadAction<{ id: number }>) => {
      state.cards[id].isActive = false;
    },
    clearOpened: (state, { payload }: PayloadAction) => {
      state.openedСards = [];
    },

    addToguessed: (
      state,
      { payload: { ids } }: PayloadAction<{ ids: number[] }>
    ) => {
      return {
        ...state,
        guessedСards: [...ids, ...state.guessedСards],
      };
    },
  },
});

export const { openCard, closeCard, fillBoard, clearOpened, addToguessed } =
  memorySlice.actions;
export const selectCards = (state: RootState) => state.memory.cards;
export const selectIds = (state: RootState) => state.memory.ids;
export const selectOpened = (state: RootState) => state.memory.openedСards;
export const selectGuessed = (state: RootState) => state.memory.guessedСards;

export const cardArraySelector = createSelector(
  selectCards,
  selectIds,
  (cards, ids) => {
    return ids.map((id) => cards[id]);
  }
);
export const openedCardValueSelector = createSelector(
  selectCards,
  selectOpened,
  (cards, [a, b]) => {
    if (a && b) {
      return [cards[a].value, cards[b].value];
    }
    return [];
  }
);

export const getCardSelector = (id: number) =>
  createSelector(selectCards, (cards) => cards[id]);

export const isDisabledSelector = createSelector(
  selectOpened,
  (opened) => opened.length === 2
);
export const getIsGuessedSelector = (id: number) =>
  createSelector(selectGuessed, (guessed) => guessed.includes(id));

export default memorySlice.reducer;
