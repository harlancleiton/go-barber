import React, { useRef, useEffect, useCallback } from 'react';
import { TextInputProps, TextInput as TextInputBase } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

interface InputReference extends TextInputBase {
  value: string;
}

const Input: React.FC<InputProps> = ({ name, icon, onChangeText, ...rest }) => {
  const inputRef = useRef<InputReference>(null);

  const { fieldName, registerField, defaultValue = '' } = useField(name);

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputRef.current,
      getValue() {
        if (inputRef.current) return inputRef.current.value;

        return '';
      },
      setValue(ref, value) {
        if (inputRef.current) {
          inputRef.current.setNativeProps({ text: value });
          inputRef.current.value = value;
        }
      },
      clearValue() {
        if (inputRef.current) {
          inputRef.current.setNativeProps({ text: '' });
          inputRef.current.value = '';
        }
      },
    });
  }, [fieldName, registerField]);

  const handleChangeText = useCallback(
    (value: string) => {
      if (inputRef.current) inputRef.current.value = value;

      if (onChangeText) onChangeText(value);
    },
    [onChangeText]
  );

  return (
    <Container>
      <Icon name={icon} color="#666360" size={20} />
      <TextInput
        ref={inputRef}
        placeholderTextColor="#666360"
        onChangeText={handleChangeText}
        defaultValue={defaultValue}
        {...rest}
      />
    </Container>
  );
};

export default Input;
