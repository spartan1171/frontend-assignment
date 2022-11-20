import React, { FC } from 'react';
import styled from '@emotion/styled';
import Label from '../Label/Label';

const StyledLabel = styled(Label)`
  :hover {
    cursor: pointer;
  }
`;

const StyledCheckboxInput = styled.input`
  margin-right: 2px;
  vertical-align: bottom;
  :hover {
    cursor: pointer;
  }
`;

interface CheckboxProps {
  label: string;
  onChange: () => void;
  isChecked?: boolean;
  className?: string;
}

const Checkbox: FC<CheckboxProps> = ({
  label,
  onChange,
  isChecked = false,
  className,
}: CheckboxProps) => {
  return (
    <StyledLabel className={className}>
      <StyledCheckboxInput
        type="checkbox"
        onChange={onChange}
        checked={isChecked}
      />
      Reat time data
    </StyledLabel>
  );
};

export default Checkbox;
