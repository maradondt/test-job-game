import { useEffect } from 'react';
import {
  addToguessed,
  clearOpened,
  closeCard,
  fillBoard,
  openedCardValueSelector,
} from '../../../features/memory/memorySlice';
import { useAppDispatch, useAppSelector } from './../../../app/hooks';
import {
  selectIds,
  selectOpened,
} from './../../../features/memory/memorySlice';
export const useGame = () => {
  const dispatch = useAppDispatch();
  const cardIds = useAppSelector(selectIds);
  const openedCards = useAppSelector(selectOpened);
  const openedCardsValues = useAppSelector(openedCardValueSelector);

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
        openedCards.map((id) => dispatch(closeCard({ id })));
      }, 500);
    }
  }, [dispatch, openedCards, openedCards.length, openedCardsValues]);

  useEffect(() => {
    dispatch(fillBoard());
  }, [dispatch]);

  return { cardIds };
};
