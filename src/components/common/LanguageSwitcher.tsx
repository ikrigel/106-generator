/**
 * LanguageSwitcher component
 * Toggle between English and Hebrew languages
 */

import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { value: 'en' as const, label: 'EN', flag: '🇺🇸' },
    { value: 'he' as const, label: 'עברית', flag: '🇮🇱' },
  ];

  return (
    <div className="flex gap-1 rounded-lg border border-slate-300 bg-slate-100 p-1 dark:border-slate-600 dark:bg-slate-700">
      {languages.map(({ value, label, flag }) => (
        <button
          key={value}
          onClick={() => setLanguage(value)}
          title={`Switch to ${label} language`}
          className={`flex items-center gap-1 rounded px-2 py-1 text-sm font-medium transition-colors ${
            language === value
              ? 'bg-white text-slate-900 shadow dark:bg-slate-800 dark:text-slate-100'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
          }`}
          aria-label={`${label} language`}
          aria-pressed={language === value}
        >
          <span>{flag}</span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
