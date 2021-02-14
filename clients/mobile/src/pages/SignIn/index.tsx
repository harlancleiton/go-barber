import React, { useCallback, useRef } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import LogoImg from '../../../assets/logo.png';
import { Button, Input } from '../../components';
import { useAuth } from '../../hooks';
import { getValidationErrors } from '../../utils';
import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText
} from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const { signIn } = useAuth();

  const formRef = useRef<FormHandles>(null);

  const handleSignUpNavigation = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  const handleSubmit: SubmitHandler<SignInFormData> = useCallback(
    async formData => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail é obrigatório'),
          password: Yup.string().required('Senha obrigatória')
        });

        await schema.validate(formData, { abortEarly: false });

        const { email, password } = formData;
        await signIn({ email, password });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const validationErrors = getValidationErrors(error);

          formRef.current?.setErrors(validationErrors);
        }
      }
    },
    [signIn]
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Container>
          <Image source={LogoImg} />
          <Title>Faça seu logon</Title>

          <Form ref={formRef} onSubmit={handleSubmit} style={{ width: '100%' }}>
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

        <CreateAccountButton onPress={handleSignUpNavigation}>
          <>
            <Feather name="log-in" size={20} color="#ff9000" />
            <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
          </>
        </CreateAccountButton>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
