/**
 * useSettings hook
 * Provides access to settings context
 */

import { useContext } from 'react';
import { SettingsContext } from '@/contexts/SettingsContext';
import type { SettingsContextType } from '@/types/settings.types';

export function useSettings(): SettingsContextType {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }

  return context;
}
