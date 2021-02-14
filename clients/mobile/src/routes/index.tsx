import React, { useEffect } from 'react';

import * as SplashScreen from 'expo-splash-screen';

import { useAuth } from '../hooks';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const Routes: React.FC = () => {
  const { signed, loading } = useAuth();

  useEffect(() => {
    async function hideSplashScreen() {
      await SplashScreen.hideAsync();
    }

    if (!loading) hideSplashScreen();
  }, [loading]);

  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
