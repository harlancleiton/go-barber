import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { SignIn, SignUp } from '../pages';

const Routes: React.FC = () => {
  const Auth = createStackNavigator();

  return (
    <Auth.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#312e38' },
      }}
    >
      <Auth.Screen name="SignIn" component={SignIn} />
      <Auth.Screen name="SignUp" component={SignUp} />
    </Auth.Navigator>
  );
};

export default Routes;