import styled from 'styled-components/native';

import { FontFamily } from '../../utils';

export const Container = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 0 30px;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: ${FontFamily.ROBOTO_SLAB_MEDIUM};
  margin: 64px 0 24px;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ForgotPasswordText = styled.Text`
  color: #f4ede8;
  font-size: 16px;
  font-family: ${FontFamily.ROBOTO_SLAB_REGULAR};
`;

export const CreateAccountButton = styled.TouchableOpacity`
  width: 100%;
  border-color: #232129;
  border-top-width: 1px;
  padding: 16px 0;

  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const CreateAccountButtonText = styled.Text`
  color: #ff9000;
  font-size: 18px;
  font-family: ${FontFamily.ROBOTO_SLAB_REGULAR};
  margin-left: 16px;
`;
