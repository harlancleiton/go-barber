import React from 'react';

import { GlobalStyle } from './styles';
import { SignIn } from './pages';

export default function App(): React.ReactElement {
  return (
    <>
      <SignIn />
      <GlobalStyle />
    </>
  );
}
