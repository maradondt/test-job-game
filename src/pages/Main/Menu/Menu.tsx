import React from 'react';
import { Menu as MenuView } from '../../../components/Menu/Menu';
import { useMenu } from './hooks';

export const Menu = () => {
  const props = useMenu();
  return <MenuView {...props} />;
};
