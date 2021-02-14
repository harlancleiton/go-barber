import React from 'react';

import useAuth, { AuthProvider } from './auth';
import useToast, {
  ToastProvider,
  ToastMessage as ToastMessageType
} from './toast';

const AppProvider: React.FC = ({ children }) => (
  <ToastProvider>
    <AuthProvider>{children}</AuthProvider>
  </ToastProvider>
);

export { AppProvider, AuthProvider, ToastProvider, useAuth, useToast };
export type ToastMessage = ToastMessageType;
