import {
  showMessage as showMessageBase,
  MessageOptions,
} from 'react-native-flash-message';

export default function showMessage(options: MessageOptions): void {
  showMessageBase({
    backgroundColor: '#f4ede8',
    color: '#232129',
    ...options,
  });
}
