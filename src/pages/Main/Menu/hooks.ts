import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useCallback, useMemo, useEffect, useState } from 'react';
import {
  selectStatus,
  startGame,
  setName as setPlayerName,
  selectPlayerName,
  selectResults,
  fillBoard,
} from '../../../features/memory/memorySlice';

export const useMenu = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const initialName = useAppSelector(selectPlayerName);
  const results = useAppSelector(selectResults);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [name, setName] = useState<string>(initialName);

  const startHandler = useCallback(() => {
    dispatch(startGame());
    dispatch(setPlayerName({ name }));
  }, [dispatch, name]);

  useEffect(() => {
    switch (status) {
      case 'idle':
        setIsOpen(true);
        break;
      case 'playing':
        setIsOpen(false);
        dispatch(fillBoard());
        setIsFinished(false);
        break;
      case 'finished':
        setIsOpen(true);
        setIsFinished(true);
        break;
      default:
        break;
    }
  }, [dispatch, isOpen, status]);

  const nameHandler = useCallback((value: string) => {
    setName(value);
  }, []);

  const startBtnDisabled = useMemo(() => {
    return !name.length;
  }, [name.length]);

  return {
    isOpen,
    isFinished,
    onStart: startHandler,
    onChangeName: nameHandler,
    name,
    results,
    disabled: startBtnDisabled,
  };
};
