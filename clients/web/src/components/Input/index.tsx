import React, { InputHTMLAttributes, useRef, useEffect } from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

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
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({ name: fieldName, ref: inputRef.current, path: 'value' });
  }, [registerField, fieldName]);

  return (
    <Container>
      {Icon && <Icon {...iconProps} />}
      <input ref={inputRef} name={name} defaultValue={defaultValue} {...rest} />
    </Container>
  );
};

export default Input;
