import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { ToastNotification } from '../types';

interface ToastContextValue {
  toasts: ToastNotification[];
  showToast: (title: string, message: string, type?: ToastNotification['type']) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((title: string, message: string, type: ToastNotification['type'] = 'blue') => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newToast: ToastNotification = { id, title, message, type };

    setToasts((prev) => [...prev.slice(-3), newToast]); // keep max 4 toasts

    setTimeout(() => {
      dismissToast(id);
    }, 4000);
  }, [dismissToast]);

  return (
    <ToastContext.Provider value={{ toasts, showToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return ctx;
};
