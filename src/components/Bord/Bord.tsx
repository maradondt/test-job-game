import React from 'react';
import styles from './styles.module.scss';

export const Bord = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className={styles.root}>
      <div className={styles.bord}>{children}</div>
    </main>
  );
};
