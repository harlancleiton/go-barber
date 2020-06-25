import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SignIn, SignUp } from '../pages';

const AuthRoutes: React.FC = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#312e38' },
      }}
    >
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default AuthRoutes;
