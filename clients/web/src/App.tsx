import React from 'react';

import { AuthProvider } from './hooks';
import { SignIn } from './pages';
import { GlobalStyle } from './styles';

export default function App(): React.ReactElement {
  return (
    <>
      <AuthProvider>
        <SignIn />
      </AuthProvider>
      <GlobalStyle />
    </>
  );
}
