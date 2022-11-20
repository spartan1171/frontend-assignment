import React, { FC, ReactNode } from 'react';
import styled from '@emotion/styled';
import GridContextProvider from './components/GridContextProvider';

export const MAX_GRID_SIZE = 12;
export const DEFAULT_MP = 8;

interface StyledGridContainerProps {
  spacing: number;
  size?: number;
}

const StyledGridContainer = styled.div((props: StyledGridContainerProps) => {
  const { spacing, size } = props;
  const currentSpacing = `${DEFAULT_MP * spacing}px`;

  return {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: `-${currentSpacing}`,
    marginLeft: `-${currentSpacing}`,
    ...(!size && {
      width: `calc(100% - ${currentSpacing})`,
    }),
    ...(size && {
      paddingLeft: `${currentSpacing}`,
      paddingTop: `${currentSpacing}`,
      flexBasis: `${(100 * size) / MAX_GRID_SIZE}%`,
    }),
  };
});

interface GridContainerProps {
  spacing: number;
  size?: number;
  children?: ReactNode;
}

const GridContainer: FC<GridContainerProps> = (props: GridContainerProps) => {
  const { spacing, size, children } = props;

  return (
    <GridContextProvider spacing={spacing}>
      <StyledGridContainer spacing={spacing} size={size}>
        {children}
      </StyledGridContainer>
    </GridContextProvider>
  );
};

export default GridContainer;
