import React from 'react';
import styles from './styles.module.scss';

type Props = {
  isOpen: boolean;
  onStart: () => void;
  name: string;
  onChangeName: (v: string) => void;
  isFinished: boolean;
  results?: { name: string; time: string }[];
  disabled: boolean;
};

export const Menu: React.FC<Props> = ({
  isOpen,
  onStart,
  onChangeName,
  name,
  isFinished,
  results,
  disabled,
}) => {
  return (
    <>
      {isOpen && (
        <div className={styles.root}>
          <div className={styles.paper}>
            <div className={styles.row}>
              <h3 className={styles.title}>
                {isFinished ? 'Congratulations' : 'Memory'}
              </h3>
            </div>
            <div className={styles.row}>
              <label className={styles.label}>
                Who's playing?
                <input
                  value={name}
                  className={styles.input}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChangeName(e.target.value);
                  }}
                  type="text"
                  name="name"
                  id="name"
                />
              </label>
            </div>
            <div className={styles.row}>
              <button
                className={styles.button}
                disabled={disabled}
                onClick={onStart}
              >
                Start Game
              </button>
            </div>
            {isFinished && results && (
              <div className={styles.row}>
                <h4 className={styles.title}>Results</h4>
                <ul>
                  {results.map(({ name, time }, i) => {
                    return (
                      <li key={i}>
                        {i + 1}
                        {': '}
                        {name}
                        {' - '}
                        {time}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
