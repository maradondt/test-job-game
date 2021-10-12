import React from 'react';
import { Bord } from '../../../components/Bord/Bord';
import { Card } from '../Card/Card';
import { useGame } from './hooks';

export const Game = () => {
  const { cardIds } = useGame();

  return (
    <Bord>
      {cardIds.map((id) => {
        return <Card key={id} id={id} />;
      })}
    </Bord>
  );
};
