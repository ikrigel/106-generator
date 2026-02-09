/**
 * useLogger hook
 * Provides access to logging context
 */
import { useContext } from 'react';
import { LogContext } from '@/contexts/LogContext';
export function useLogger() {
    var context = useContext(LogContext);
    if (!context) {
        throw new Error('useLogger must be used within a LogProvider');
    }
    return context;
}
