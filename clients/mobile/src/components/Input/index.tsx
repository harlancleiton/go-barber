import React, { useRef, useEffect, useCallback, useState } from 'react';
import {
  TextInputProps,
  TextInput as TextInputBase,
  NativeSyntheticEvent,
  TextInputFocusEventData
} from 'react-native';

import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './styles';

export interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  rawText?: string;
  onInitialData?(text: string): void;
}

export interface InputReference extends TextInputBase {
  value: string;
}

const Input: React.FC<InputProps> = ({
  name,
  icon,
  onChangeText,
  onFocus,
  onBlur,
  rawText,
  onInitialData,
  ...rest
}) => {
  const inputRef = useRef<InputReference>(null);

  const { fieldName, registerField, defaultValue = '', error } = useField(name);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(true);

      if (onFocus) onFocus(e);
    },
    [onFocus]
  );

  const handleInputBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(false);

      if (inputRef.current) setIsFilled(!!inputRef.current.value);

      if (onBlur) onBlur(e);
    },
    [onBlur]
  );

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = defaultValue;
  }, [defaultValue]);

  useEffect(() => {
    if (onInitialData) onInitialData(defaultValue);
  }, [defaultValue, onInitialData]);

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputRef.current,
      getValue() {
        if (rawText) return rawText;

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
      }
    });
  }, [fieldName, rawText, registerField]);

  const handleChangeText = useCallback(
    (value: string) => {
      if (inputRef.current) inputRef.current.value = value;

      if (onChangeText) onChangeText(value);
    },
    [onChangeText]
  );

  return (
    <Container isFocused={isFocused} isErrored={!!error}>
      <Icon
        name={icon}
        color={isFocused || isFilled ? '#ff9000' : '#666360'}
        size={20}
      />
      <TextInput
        ref={inputRef}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        placeholderTextColor="#666360"
        onChangeText={handleChangeText}
        defaultValue={defaultValue}
        {...rest}
      />
    </Container>
  );
};

export default Input;
