import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  getCardSelector,
  getIsGuessedSelector,
  isDisabledSelector,
  openCard,
} from './../../../features/memory/memorySlice';

export const useCard = (id: number) => {
  const dispatch = useAppDispatch();
  const currentCard = useAppSelector(getCardSelector(id));
  const isDisabled = useAppSelector(isDisabledSelector);
  const isGuessed = useAppSelector(getIsGuessedSelector(id));

  const onOpenHandler = useCallback(() => {
    dispatch(openCard({ id }));
  }, [dispatch, id]);
  return {
    ...currentCard,
    onClick: onOpenHandler,
    disabled: isDisabled,
    guessed: isGuessed,
  };
};
