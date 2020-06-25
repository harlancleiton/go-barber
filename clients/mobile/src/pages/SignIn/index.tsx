import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

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

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const navigation = useNavigation();

  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const formRef = useRef<FormHandles>(null);

  const handleSignUpNavigation = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  const handleSubmit = useCallback<SubmitHandler<SignInFormData>>(
    (formData) => {
      // eslint-disable-next-line no-console
      console.log(formData);

      formRef.current?.setFieldValue('email', 'harlancleiton@example.com.br');
    },
    []
  );

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

            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input
                name="email"
                icon="mail"
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                onSubmitEditing={() => {
                  formRef.current?.getFieldRef('password').focus();
                }}
              />
              <Input
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                autoCapitalize="none"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Entrar
              </Button>
            </Form>

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
