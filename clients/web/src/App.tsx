import React from 'react';

import { AppProvider } from './hooks';
import { SignIn } from './pages';
import { GlobalStyle } from './styles';

export default function App(): React.ReactElement {
  return (
    <>
      <AppProvider>
        <SignIn />
      </AppProvider>
      <GlobalStyle />
    </>
  );
}
