import React, { FC, ReactNode, useContext } from 'react';
import styled from '@emotion/styled';
import { DEFAULT_MP, MAX_GRID_SIZE } from './GridContainer';
import GridContext from './components/GridContext';

const StyledGridItem = styled.div(
  (props: { size: number; spacing: number }) => {
    const currentSpacing = `${DEFAULT_MP * props.spacing}px`;

    return {
      boxSizing: 'border-box',
      paddingLeft: `${currentSpacing}`,
      paddingTop: `${currentSpacing}`,
      flexBasis: `${(100 * props.size) / MAX_GRID_SIZE}%`,
      flexFlow: 'row wrap',
      flexGrow: 0,
      margin: 0,
    };
  }
);

interface GridItemProps {
  size: number;
  children: ReactNode;
}

const GridItem: FC<GridItemProps> = (props: GridItemProps) => {
  const { size, children } = props;
  const { spacing } = useContext(GridContext);

  return (
    <StyledGridItem size={size} spacing={spacing}>
      {children}
    </StyledGridItem>
  );
};

export default GridItem;
