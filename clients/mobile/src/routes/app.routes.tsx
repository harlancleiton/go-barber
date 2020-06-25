import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from '../pages';

const AppRoutes: React.FC = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: '#312e38' },
      }}
    >
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default AppRoutes;
