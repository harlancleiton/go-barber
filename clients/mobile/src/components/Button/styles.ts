import { RectButton } from 'react-native-gesture-handler';

import styled from 'styled-components/native';

import { FontFamily } from '../../utils';

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  background: #ff9000;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text`
  font-family: ${FontFamily.ROBOTO_SLAB_MEDIUM};
  color: #312e38;
  font-size: 16px;
`;
