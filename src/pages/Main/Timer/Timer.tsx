import React from 'react';
import { Timer as TimerView } from '../../../components/Timer/Timer';
import { useTimer } from './hooks';

export const Timer = ({ ...other }) => {
  const props = useTimer();
  return <TimerView {...props} {...other} />;
};
