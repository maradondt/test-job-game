import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.scss';

type Props = {
  isRunning: boolean;
  minutes: string | number;
  seconds: string | number;
  className?: string;
};

export const Timer: React.FC<Props> = ({
  isRunning,
  minutes,
  seconds,
  className,
}) => {
  return (
    <>
      {isRunning && (
        <div className={clsx(className, styles.root)}>
          {minutes}:{seconds}
        </div>
      )}
    </>
  );
};
