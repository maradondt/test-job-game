import React from 'react';
import { Game } from './Game/Game';
import { Menu } from './Menu/Menu';
import { Timer } from './Timer/Timer';
import styles from './styles.module.scss';

export const Main = () => {
  return (
    <div>
      <Game />
      <Menu />
      <Timer className={styles.timer} />
    </div>
  );
};
