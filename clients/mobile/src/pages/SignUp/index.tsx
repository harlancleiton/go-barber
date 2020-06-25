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
  BackToSignInButton,
  BackToSignInButtonText,
} from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();

  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const formRef = useRef<FormHandles>(null);

  const handleSignInNavigation = useCallback(() => {
    navigation.navigate('SignIn');
  }, [navigation]);

  const handleSubmit = useCallback<SubmitHandler<SignUpFormData>>(
    (formData) => {
      // eslint-disable-next-line no-console
      console.log(formData);
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
            <Title>Crie sua conta</Title>

            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input
                name="name"
                icon="user"
                placeholder="Nome"
                autoCapitalize="words"
              />
              <Input
                name="email"
                icon="mail"
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Input
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                autoCapitalize="none"
              />
              <Button
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Criar conta
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      {!keyboardOpen && Platform.OS === 'android' && (
        <BackToSignInButton onPress={handleSignInNavigation}>
          <>
            <Feather name="arrow-left" size={20} color="#fff" />
            <BackToSignInButtonText>Voltar para logon</BackToSignInButtonText>
          </>
        </BackToSignInButton>
      )}
    </>
  );
};

export default SignUp;
