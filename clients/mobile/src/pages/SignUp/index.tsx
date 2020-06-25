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
  BackToSignInButton,
  BackToSignInButtonText,
} from './styles';

const SignUp: React.FC = () => {
  const navigation = useNavigation();

  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const handleSignInNavigation = useCallback(() => {
    navigation.navigate('SignIn');
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
            <Title>Crie sua conta</Title>

            <Input name="name" icon="user" placeholder="Nome" />
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
