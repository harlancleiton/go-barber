import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import { AsyncStorage } from 'react-native';

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
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

interface AuthState {
  token: string;
  user: User;
}

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAuthDate() {
      const [token, user] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:user',
      ]);

      if (token[1] && user[1])
        setData({ token: token[1], user: JSON.parse(user[1]) });

      setLoading(false);
    }

    loadAuthDate();
  }, []);

  const handleSignIn = useCallback(async (credentials: SignInCredentials) => {
    const response = await api.post<SignInResponse>('auth/login', credentials);

    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)],
    ]);

    setData({ token, user });
  }, []);

  const handleSignOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user']);

    setData(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data?.user,
        signed: !!data?.user,
        signIn: handleSignIn,
        signOut: handleSignOut,
        loading,
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
