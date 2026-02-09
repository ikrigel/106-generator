import React from 'react';

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
      <header className="border-b border-slate-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            MOC 106 Form Generator
          </h1>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 py-4 text-center text-sm text-slate-600 dark:text-slate-400 sm:px-6 lg:px-8">
          <p>&copy; 2024 MOC 106 Form Generator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
