import React from 'react';
import { Cadr as CadrView } from '../../../components/Card/Cadr';
import { useCard } from './hooks';

export const Card = ({ id }: { id: number }) => {
  const props = useCard(id);

  return <CadrView {...props} />;
};
