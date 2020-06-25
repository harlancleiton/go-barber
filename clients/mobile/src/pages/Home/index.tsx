import React from 'react';
import { Text } from 'react-native';

import { Button } from '../../components';
import { useAuth } from '../../hooks';
import { Container } from './styles';

const Home: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <Text>Home</Text>
      <Button onPress={signOut}>Sair</Button>
    </Container>
  );
};

export default Home;
