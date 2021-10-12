import { noop } from 'lodash';
import { useCallback, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  clearOpened,
  closeCard,
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

  const [seconds, setSeconds] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout>(setInterval(noop, 0));

  const resetTimer = useCallback(() => {
    clearInterval(timer);
    setSeconds(0);
  }, [timer]);

  const startTimer = useCallback(() => {
    const timerId = setInterval(() => {
      setSeconds((value) => value + 1);
    }, 1000);
    setTimer(timerId);
  }, []);

  useEffect(() => {
    if (!currentCard.isActive || isGuessed) {
      resetTimer();
    }
  }, [currentCard.isActive, isGuessed, resetTimer]);

  useEffect(() => {
    if (seconds >= 5) {
      resetTimer();
      dispatch(closeCard({ id }));
      dispatch(clearOpened());
    }
  }, [dispatch, id, isDisabled, isGuessed, resetTimer, seconds]);

  const onOpenHandler = useCallback(() => {
    dispatch(openCard({ id }));
    startTimer();
  }, [dispatch, id, startTimer]);
  return {
    ...currentCard,
    onClick: onOpenHandler,
    disabled: isDisabled,
    guessed: isGuessed,
  };
};
