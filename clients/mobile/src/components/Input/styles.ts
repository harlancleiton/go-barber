import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

import { FontFamily } from '../../utils';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #232129;
  border-radius: 10px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;

  border-width: 2px;
  border-color: #232129;

  ${({ isErrored }) =>
    isErrored &&
    css`
      border-color: #c53030;
    `}

  ${({ isFocused }) =>
    isFocused &&
    css`
      border-color: #ff9000;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-family: ${FontFamily.ROBOTO_SLAB_REGULAR};
`;

export const Icon = styled(Feather)`
  margin-right: 16px;
`;
