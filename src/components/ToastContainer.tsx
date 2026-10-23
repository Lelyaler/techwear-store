import React from 'react';
import { useToast } from '../context/ToastContext';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" role="status" aria-live="polite">
      {toasts.map((toast) => {
        const typeClass =
          toast.type === 'pink' || toast.type === 'error'
            ? 'toast--pink'
            : toast.type === 'green'
            ? 'toast--green'
            : 'toast--blue';

        return (
          <div
            key={toast.id}
            className={`toast toast--show ${typeClass}`}
            onClick={() => dismissToast(toast.id)}
            style={{ cursor: 'pointer' }}
          >
            <div className="toast__header">{toast.title}</div>
            <div className="toast__message">{toast.message}</div>
          </div>
        );
      })}
    </div>
  );
};
