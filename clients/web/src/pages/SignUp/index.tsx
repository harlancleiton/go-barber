import React, { useRef, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiMail, FiLock } from 'react-icons/fi';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import logoImg from '../../assets/logo.svg';

import { Button, Input } from '../../components';
import { useToast } from '../../hooks';
import { api } from '../../services';
import { getValidationErrors } from '../../utils';
import { Container, Content, Background } from './styles';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  const { addToast } = useToast();

  const handleSubmit: SubmitHandler<FormData> = useCallback(
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

        await api.post('users', formData);

        history.push('/');

        addToast({
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu logon no GoBarber',
          type: 'success',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const validationErrors = getValidationErrors(error);

          formRef.current?.setErrors(validationErrors);

          return;
        }

        addToast({
          title: 'Erro no cadastro',
          type: 'error',
          description: 'Ocorreu um erro ao se cadastrar, tente novamente',
        });
      }
    },
    [addToast, history]
  );

  return (
    <Container>
      <Background />

      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit} noValidate>
          <h1>Faça seu cadastro</h1>

          <Input name="name" icon={FiMail} type="text" placeholder="Nome" />
          <Input name="email" icon={FiMail} type="email" placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Cadastrar</Button>
        </Form>

        <Link to="/">
          <FiArrowLeft />
          Voltar para logon
        </Link>
      </Content>
    </Container>
  );
};

export default SignUp;
