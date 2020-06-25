import React, { useCallback, useRef } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import LogoImg from '../../../assets/logo.png';

import { Button, Input } from '../../components';
import { api } from '../../services';
import { getValidationErrors, showMessage } from '../../utils';
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

  const formRef = useRef<FormHandles>(null);

  const handleSignInNavigation = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSubmit: SubmitHandler<SignUpFormData> = useCallback(
    async (formData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail é obrigatório'),
          password: Yup.string().min(6, 'No mínimo 6 caracteres'),
        });

        await schema.validate(formData, { abortEarly: false });

        const { email, name, password } = formData;

        await api.post('users', { email, name, password });

        showMessage({ message: 'Cadastro efetuado com sucesso' });
        handleSignInNavigation();
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const validationErrors = getValidationErrors(error);

          formRef.current?.setErrors(validationErrors);
        }
      }
    },
    [handleSignInNavigation]
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
          <Title>Crie sua conta</Title>

          <Form ref={formRef} onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Input
              name="name"
              icon="user"
              placeholder="Nome"
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={() => {
                formRef.current?.getFieldRef('email').focus();
              }}
            />
            <Input
              name="email"
              icon="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
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
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
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

        <BackToSignInButton onPress={handleSignInNavigation}>
          <>
            <Feather name="arrow-left" size={20} color="#fff" />
            <BackToSignInButtonText>Voltar para logon</BackToSignInButtonText>
          </>
        </BackToSignInButton>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
