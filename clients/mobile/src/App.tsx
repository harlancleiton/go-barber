import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
// TODO add expo-status-bar
import { StatusBar, Text } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import RobotoSlabMedium from '../assets/fonts/RobotoSlab-Medium.ttf';
import RobotoSlabRegular from '../assets/fonts/RobotoSlab-Regular.ttf';
import { AppProvider } from './hooks';
import Routes from './routes';
import { FontFamily } from './utils';

const App: React.FC = () => {
  const [loadingFonts, setLoadingFonts] = useState(true);

  useEffect(() => {
    async function preventSplashScreen() {
      await SplashScreen.preventAutoHideAsync();
    }

    preventSplashScreen();
  }, []);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        [FontFamily.ROBOTO_SLAB_MEDIUM]: RobotoSlabMedium,
        [FontFamily.ROBOTO_SLAB_REGULAR]: RobotoSlabRegular
      });

      setLoadingFonts(false);
    }

    loadFonts();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        {loadingFonts ? (
          <Text>Carregando</Text>
        ) : (
          <NavigationContainer>
            <StatusBar
              backgroundColor="#312e38"
              barStyle="light-content"
              translucent
            />

            <AppProvider>
              <Routes />
            </AppProvider>
            <FlashMessage position="bottom" floating />
          </NavigationContainer>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
