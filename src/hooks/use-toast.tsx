import { createContext, useContext, type ReactNode } from 'react';
import { message } from 'antd';

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error' | 'warning' | 'info') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const messageMap = {
  success: message.success,
  error: message.error,
  warning: message.warning,
  info: message.info,
} as const;

export function ToastProvider({ children }: { children: ReactNode }) {
  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    const duration = type === 'error' || type === 'warning' ? 3 : 2.5;
    messageMap[type](message, duration);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}