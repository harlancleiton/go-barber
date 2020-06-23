import React, { useEffect, CSSProperties } from 'react';
import {
  FiAlertCircle,
  FiCheckCircle,
  FiInfo,
  FiXCircle,
} from 'react-icons/fi';

import { ToastMessage, useToast } from '../../../hooks';
import { Container } from './styles';

interface ToastProps {
  message: ToastMessage;
  style: CSSProperties;
}

const icons = {
  error: <FiAlertCircle size={24} />,
  info: <FiInfo size={24} />,
  success: <FiCheckCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { autoClose, removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, autoClose);

    return () => clearTimeout(timer);
  }, [autoClose, message, removeToast]);

  return (
    <Container
      key={message.id}
      hasDescription={!!message.description}
      type={message.type}
      style={style}
    >
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button type="button" onClick={() => removeToast(message.id)}>
        <FiXCircle />
      </button>
    </Container>
  );
};

export default Toast;
