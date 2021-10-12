import { useCallback, useEffect } from 'react';
import {
  addToguessed,
  clearOpened,
  closeCard,
  fillBoard,
  finishGame,
  openedCardValueSelector,
  selectGuessed
} from '../../../features/memory/memorySlice';
import { useAppDispatch, useAppSelector } from './../../../app/hooks';
import {
  selectIds,
  selectOpened
} from './../../../features/memory/memorySlice';
export const useGame = () => {
  const dispatch = useAppDispatch();
  const cardIds = useAppSelector(selectIds);
  const openedCards = useAppSelector(selectOpened);
  const guessedCards = useAppSelector(selectGuessed);
  const openedCardsValues = useAppSelector(openedCardValueSelector);

  const closeCards = useCallback(() => {
    openedCards.map((id) => dispatch(closeCard({ id })));
  }, [dispatch, openedCards]);

  useEffect(() => {
    if (openedCards.length !== 2) {
      return;
    }
    const [a, b] = openedCardsValues;
    const isEqual = a === b;
    if (isEqual) {
      dispatch(clearOpened());
      dispatch(addToguessed({ ids: openedCards }));
    } else {
      dispatch(clearOpened());
      setTimeout(() => {
        closeCards();
      }, 500);
    }
  }, [closeCards, dispatch, openedCards, openedCardsValues]);

  useEffect(() => {
    dispatch(fillBoard());
  }, [dispatch]);

  useEffect(() => {
    if (guessedCards.length === 36) {
      dispatch(finishGame());
    }
  }, [dispatch, guessedCards.length]);

  return { cardIds };
};
