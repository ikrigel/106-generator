/**
 * useLanguage hook for i18n support
 * Provides access to current language and translation function
 */

import { useContext } from 'react';
import { LanguageContext } from '@/contexts/LanguageContext';

export function useLanguage() {
  const context = useContext(LanguageContext) as any;

  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
}
