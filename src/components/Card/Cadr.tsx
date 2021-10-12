import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

type Props = {
  isActive: boolean;
  onClick: () => void;
  value: string;
  disabled: boolean;
  guessed: boolean;
};

export const Cadr: React.FC<Props> = ({
  isActive,
  onClick,
  value,
  disabled,
  guessed,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || guessed}
      className={clsx(styles.root, { [styles.active]: isActive })}
    >
      <div
        className={clsx(styles.card, styles.front, {
          [styles.success]: guessed,
        })}
      >
        {value}
      </div>
      <div className={clsx(styles.card, styles.back)}>
        <div className={styles.back}></div>
      </div>
    </button>
  );
};
