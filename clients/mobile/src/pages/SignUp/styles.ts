import styled from 'styled-components/native';

import { FontFamily } from '../../utils';

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 0 30px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: ${FontFamily.ROBOTO_SLAB_MEDIUM};
  margin: 64px 0 24px;
`;

export const BackToSignInButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  border-color: #232129;
  border-top-width: 1px;
  padding: 16px 0;

  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const BackToSignInButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: ${FontFamily.ROBOTO_SLAB_REGULAR};
  margin-left: 16px;
`;
