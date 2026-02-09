import React from 'react';

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

export function Loading({ message = 'Loading...', fullScreen = false }: LoadingProps) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-sky-500 dark:border-slate-600 dark:border-t-sky-400" />
      {message && <p className="text-slate-600 dark:text-slate-400">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-slate-950">
        {content}
      </div>
    );
  }

  return <div className="flex justify-center py-8">{content}</div>;
}
