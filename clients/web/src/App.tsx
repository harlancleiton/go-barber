import React from 'react';

import { GlobalStyle } from './styles';
import { SignUp } from './pages';

export default function App(): React.ReactElement {
  return (
    <>
      <SignUp />
      <GlobalStyle />
    </>
  );
}
