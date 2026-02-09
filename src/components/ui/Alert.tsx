import React from 'react';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  onClose?: () => void;
}

export function Alert({ type, title, message, onClose }: AlertProps) {
  const colors = {
    success: 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300 border-green-200 dark:border-green-700',
    error: 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300 border-red-200 dark:border-red-700',
    warning: 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700',
    info: 'bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 border-blue-200 dark:border-blue-700',
  };

  return (
    <div className={`rounded-lg border p-4 ${colors[type]}`}>
      <div className="flex items-start justify-between">
        <div>
          {title && <h3 className="font-semibold mb-1">{title}</h3>}
          <p>{message}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="ml-4 text-xl leading-none">
            ×
          </button>
        )}
      </div>
    </div>
  );
}
