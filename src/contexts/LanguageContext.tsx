/**
 * Language Context for i18n support
 * Manages current language and provides translation functions
 */

import React, { createContext, useState, useCallback, useEffect } from 'react';
import type { Language } from '@/constants/i18n';
import { translations, t as translateKey } from '@/constants/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof typeof translations.en, placeholders?: Record<string, string>) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Load from localStorage or default to English
    const saved = localStorage.getItem('moc106_language');
    return (saved as Language) || 'en';
  });

  // Set language and persist to localStorage
  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('moc106_language', lang);

    // Apply to document for RTL support
    const html = document.documentElement;
    if (lang === 'he') {
      html.lang = 'he';
      html.dir = 'rtl';
      html.classList.add('rtl');
    } else {
      html.lang = 'en';
      html.dir = 'ltr';
      html.classList.remove('rtl');
    }
  }, []);

  // Translation function
  const t = useCallback(
    (key: keyof typeof translations.en, placeholders?: Record<string, string>) => {
      return translateKey(language, key, placeholders);
    },
    [language]
  );

  // Apply language on mount
  useEffect(() => {
    setLanguage(language);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
