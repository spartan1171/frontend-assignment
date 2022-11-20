import React, { FC, ReactNode, useMemo } from 'react';
import GridContext from './GridContext';

interface GridContextProviderProps {
  spacing: number;
  children?: ReactNode;
}

const GridContextProvider: FC<GridContextProviderProps> = ({
  children,
  spacing,
}) => {
  const value = useMemo(
    () => ({
      spacing,
    }),
    [spacing]
  );

  return <GridContext.Provider value={value}>{children}</GridContext.Provider>;
};

export default GridContextProvider;
