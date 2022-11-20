import React, { FC } from 'react';
import styled from '@emotion/styled';
import { colors } from '../../utils/colors';
import Label from '../Label/Label';

const StyledContainer = styled.div`
  width: 100%;
  font-size: 1rem;
  z-index: 10;
`;

const StyledProgressBar = styled.div`
  position: relative;
  width: 100%;
  padding: 3px 6px;
  margin-top: 5px;
  outline: 2px solid black;
  outline-offset: -2px;
  color: black;
  background-color: white;
  z-index: 15;
`;

interface StyledIndicatorProps {
  progress: number;
  maxValue: number;
}

const StyledIndicator = styled.div((props: StyledIndicatorProps) => ({
  display: 'inline',
  position: 'absolute',
  left: 0,
  top: 0,
  bottom: 0,
  width: `${(100 * props.progress) / props.maxValue}%`,
  backgroundColor: colors.chartBG,
  border: '2px solid black',
  overflow: 'hidden',
}));

const StyledProgressBarLabel = styled(Label)`
  margin: 1px 6px;
  white-space: nowrap;
  z-index: 100;
`;

interface ProgressBarProps {
  title: string;
  progress: number;
  maxValue?: number;
  unitOfMeasure?: string;
}

const ProgressBar: FC<ProgressBarProps> = ({
  title,
  progress,
  unitOfMeasure = '%',
  maxValue = 1,
}: ProgressBarProps) => {
  return (
    <StyledContainer>
      <Label>{title}</Label>
      <StyledProgressBar>
        {progress} {unitOfMeasure}
        <StyledIndicator progress={progress} maxValue={maxValue}>
          <StyledProgressBarLabel alternate>
            {progress} {unitOfMeasure}
          </StyledProgressBarLabel>
        </StyledIndicator>
      </StyledProgressBar>
    </StyledContainer>
  );
};

export default ProgressBar;
