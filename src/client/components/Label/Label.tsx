import React, { FC, ReactNode } from 'react';
import styled from '@emotion/styled';
import { colors } from '../../utils/colors';

interface StyledLabelProps {
  alternate?: boolean;
}

const StyledLabel = styled.label((props: StyledLabelProps) => ({
  display: 'inline-block',
  fontSize: '1rem',
  color: props.alternate ? colors.labelAlt : colors.labelPrimary,
}));

interface LabelProps {
  children?: ReactNode;
  alternate?: boolean;
  className?: string;
}

const Label: FC<LabelProps> = (props: LabelProps) => {
  const { children, alternate, className } = props;

  return (
    <StyledLabel alternate={alternate} className={className}>
      {children}
    </StyledLabel>
  );
};

export default Label;
