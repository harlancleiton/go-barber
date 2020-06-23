import React, { createContext, useCallback, useContext, useState } from 'react';
import { uuid } from 'uuidv4';

import { ToastContainer } from '../components';

export interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

interface ToastContextProps {
  autoClose: number;
  addToast(message: Omit<ToastMessage, 'id'>): ToastMessage;
  removeToast(id: string): void;
}

const ToastContext = createContext<ToastContextProps>({} as ToastContextProps);

interface ToastProviderProps {
  children: React.ReactNode;
  autoClose?: number;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  autoClose = 4000,
}) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const handleAddToast = useCallback(
    ({ title, type, description }: Omit<ToastMessage, 'id'>): ToastMessage => {
      const id = uuid();

      const toast: ToastMessage = { id, title, type, description };

      setMessages((state) => [...state, toast]);

      return toast;
    },
    []
  );

  const handleRemoveToast = useCallback((id: string) => {
    setMessages((state) => state.filter((message) => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider
      value={{
        autoClose,
        addToast: handleAddToast,
        removeToast: handleRemoveToast,
      }}
    >
      {children}

      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

export default function useToast(): ToastContextProps {
  const context = useContext(ToastContext);

  if (!context) throw new Error('useToast must be used within a ToastProvider');

  return context;
}
