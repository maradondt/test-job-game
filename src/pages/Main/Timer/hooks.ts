import { useEffect, useMemo } from 'react';
import { useStopwatch } from 'react-timer-hook';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectStatus,
  setTimePassed,
} from '../../../features/memory/memorySlice';

export const useTimer = () => {
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();
  const { seconds, minutes, isRunning, start, pause, reset } = useStopwatch({
    autoStart: false,
  });

  useEffect(() => {
    switch (status) {
      case 'idle':
        break;
      case 'playing':
        reset();
        start();
        break;
      case 'finished':
        pause();
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    dispatch(setTimePassed({ time: `${min}:${sec}` }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, seconds]);

  const min = useMemo(
    () => (String(minutes).length < 2 ? `0${minutes}` : minutes),
    [minutes]
  );
  const sec = useMemo(
    () => (String(seconds).length < 2 ? `0${seconds}` : seconds),
    [seconds]
  );

  return {
    seconds: sec,
    minutes: min,
    isRunning,
  };
};
