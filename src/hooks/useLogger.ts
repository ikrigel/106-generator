/**
 * useLogger hook
 * Provides access to logging context
 */

import { useContext } from 'react';
import { LogContext } from '@/contexts/LogContext';
import type { LogContextType } from '@/types/log.types';

export function useLogger(): LogContextType {
  const context = useContext(LogContext);

  if (!context) {
    throw new Error('useLogger must be used within a LogProvider');
  }

  return context;
}
