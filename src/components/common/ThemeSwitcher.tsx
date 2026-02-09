/**
 * ThemeSwitcher component
 * Toggle between light, dark, and auto theme modes
 */

import React from 'react';
import { useTheme } from '@/hooks/useTheme';
import type { ThemeMode } from '@/types/theme.types';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const themes: { value: ThemeMode; label: string; icon: string }[] = [
    { value: 'light', label: 'Light', icon: '☀️' },
    { value: 'dark', label: 'Dark', icon: '🌙' },
    { value: 'auto', label: 'Auto', icon: '🔄' },
  ];

  return (
    <div className="flex gap-1 rounded-lg border border-slate-300 bg-slate-100 p-1 dark:border-slate-600 dark:bg-slate-700">
      {themes.map(({ value, label, icon }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          title={`Switch to ${label} theme`}
          className={`flex items-center gap-1 rounded px-2 py-1 text-sm font-medium transition-colors ${
            theme === value
              ? 'bg-white text-slate-900 shadow dark:bg-slate-800 dark:text-slate-100'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
          }`}
          aria-label={`${label} theme`}
          aria-pressed={theme === value}
        >
          <span>{icon}</span>
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}
