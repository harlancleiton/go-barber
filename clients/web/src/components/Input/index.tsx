import React, { InputHTMLAttributes } from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>;
  iconProps?: IconBaseProps;
}

const Input: React.FC<InputProps> = ({
  name,
  icon: Icon,
  iconProps,
  ...rest
}) => {
  return (
    <Container>
      {Icon && <Icon {...iconProps} />}
      <input name={name} {...rest} />
    </Container>
  );
};

export default Input;
