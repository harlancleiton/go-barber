import React, { useState, useEffect, useCallback } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import LogoImg from '../../../assets/logo.png';

import { Button, Input } from '../../components';
import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';

const SignIn: React.FC = () => {
  const navigation = useNavigation();

  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const handleSignUpNavigation = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setKeyboardOpen(true));

    Keyboard.addListener('keyboardDidHide', () => setKeyboardOpen(false));
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={LogoImg} />
            <Title>Faça seu logon</Title>

            <Input
              name="email"
              icon="mail"
              placeholder="E-mail"
              keyboardType="email-address"
            />
            <Input
              name="password"
              icon="lock"
              placeholder="Senha"
              secureTextEntry
            />
            <Button>Entrar</Button>

            <ForgotPassword
              onPress={() => {
                /* */
              }}
            >
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      {!keyboardOpen && Platform.OS === 'android' && (
        <CreateAccountButton onPress={handleSignUpNavigation}>
          <>
            <Feather name="log-in" size={20} color="#ff9000" />
            <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
          </>
        </CreateAccountButton>
      )}
    </>
  );
};

export default SignIn;
