import React, { useState, useCallback, forwardRef } from 'react';
import { TextInputMask, TextInputMaskProps } from 'react-native-masked-text';

import Input, { InputProps, InputReference } from '../Input';

interface InputMaskProps extends TextInputMaskProps, InputProps {
  onChangeText?: (text: string, rawText?: string) => void | undefined;
}

const InputMask: React.ForwardRefRenderFunction<
  InputReference,
  InputMaskProps
> = ({ ...rest }, inputRef) => {
  const [text, setText] = useState('');
  const [rawText, setRawText] = useState('');

  const handleChangeText = useCallback(
    (maskedValue: string, unmaskedValue: string | undefined) => {
      setText(maskedValue);

      if (unmaskedValue) setRawText(unmaskedValue);
    },
    []
  );

  return (
    <TextInputMask
      includeRawValueInChangeText
      value={text}
      onChangeText={handleChangeText}
      customTextInput={Input}
      customTextInputProps={{
        ref: inputRef,
        rawText,
        onInitialData: setText
      }}
      {...rest}
    />
  );
};

export default forwardRef(InputMask);
