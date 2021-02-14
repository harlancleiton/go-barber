import React, { createContext, useCallback, useState, useContext } from 'react';

import { api } from '../services';

interface SignInCredentials {
  email: string;
  password: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

interface SignInResponse {
  token: string;
  user: User;
}

interface AuthContextProps {
  user: User | undefined;
  signed: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

interface AuthState {
  token: string;
  user: User;
}

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState | null>(() => {
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    if (token && user) return { token, user: JSON.parse(user) };

    return null;
  });

  const handleSignIn = useCallback(async (credentials: SignInCredentials) => {
    const response = await api.post<SignInResponse>('auth/login', credentials);

    const { token, user } = response.data;

    localStorage.setItem('@GoBarber:token', JSON.stringify(token));
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const handleSignOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    setData(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data?.user,
        signed: !!data?.user,
        signIn: handleSignIn,
        signOut: handleSignOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth(): AuthContextProps {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within an AuthProvider');

  return context;
}
