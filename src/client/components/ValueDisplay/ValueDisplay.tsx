import React, { FC } from 'react';
import styled from '@emotion/styled';
import Label from '../Label/Label';

const StyledBlockLabel = styled(Label)`
  display: block;
`;

const StyledValue = styled(Label)`
  margin-top: 5px;
`;

interface ValueDisplayProps {
  title: string;
  value: number | string;
}

const ValueDisplay: FC<ValueDisplayProps> = (props: ValueDisplayProps) => {
  const { title, value } = props;

  return (
    <div>
      <StyledBlockLabel>{title}</StyledBlockLabel>
      <StyledValue>{value}</StyledValue>
    </div>
  );
};

export default ValueDisplay;
