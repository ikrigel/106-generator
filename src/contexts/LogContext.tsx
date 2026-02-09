/**
 * Log Context
 * Manages application logging and event tracking
 */

import React, { createContext, useState, useCallback, useEffect } from 'react';
import { storageService } from '@/services/storageService';
import { useSettings } from '@/hooks/useSettings';
import type { LogEntry, LogContextType, LogLevel } from '@/types/log.types';
import { generateLogId } from '@/utils/logger';

export const LogContext = createContext<LogContextType | undefined>(undefined);

interface LogProviderProps {
  children: React.ReactNode;
}

export function LogProvider({ children }: LogProviderProps) {
  const { settings } = useSettings();
  const [logs, setLogsState] = useState<LogEntry[]>(() => {
    return storageService.getLogs();
  });

  const addLog = useCallback(
    (entry: LogEntry) => {
      if (!settings.logs.enabled) return;

      const newLogs = [...logs, entry];

      // Rotate logs if exceeding max entries
      if (newLogs.length > settings.logs.maxEntries) {
        newLogs.splice(0, newLogs.length - settings.logs.maxEntries);
      }

      setLogsState(newLogs);
      storageService.setLogs(newLogs);
    },
    [logs, settings.logs.enabled, settings.logs.maxEntries],
  );

  const log = useCallback(
    (action: string, message: string, metadata?: Record<string, unknown>) => {
      if (settings.logs.logLevel !== 'debug') return;

      addLog({
        id: generateLogId(),
        timestamp: new Date().toISOString(),
        level: 'debug',
        action,
        message,
        metadata,
        userAgent: navigator.userAgent,
      });
    },
    [addLog, settings.logs.logLevel],
  );

  const info = useCallback(
    (action: string, message: string, metadata?: Record<string, unknown>) => {
      addLog({
        id: generateLogId(),
        timestamp: new Date().toISOString(),
        level: 'info',
        action,
        message,
        metadata,
        userAgent: navigator.userAgent,
      });
    },
    [addLog],
  );

  const warn = useCallback(
    (action: string, message: string, metadata?: Record<string, unknown>) => {
      if (
        settings.logs.logLevel !== 'debug' &&
        settings.logs.logLevel !== 'info'
      ) return;

      addLog({
        id: generateLogId(),
        timestamp: new Date().toISOString(),
        level: 'warn',
        action,
        message,
        metadata,
        userAgent: navigator.userAgent,
      });
    },
    [addLog, settings.logs.logLevel],
  );

  const error = useCallback(
    (action: string, message: string, metadata?: Record<string, unknown>) => {
      addLog({
        id: generateLogId(),
        timestamp: new Date().toISOString(),
        level: 'error',
        action,
        message,
        metadata,
        userAgent: navigator.userAgent,
      });
    },
    [addLog],
  );

  const clearLogs = useCallback(() => {
    setLogsState([]);
    storageService.clearLogs();
  }, []);

  const deleteLogs = useCallback((ids: string[]) => {
    setLogsState((prev) => prev.filter((log) => !ids.includes(log.id)));
    storageService.deleteLogs(ids);
  }, []);

  const exportLogs = useCallback(() => {
    const logsData = {
      exportedAt: new Date().toISOString(),
      count: logs.length,
      logs,
    };

    const dataStr = JSON.stringify(logsData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `moc106_logs_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [logs]);

  const getLogs = useCallback(
    (filter?: Partial<LogEntry>) => {
      if (!filter) return logs;

      return logs.filter((log) => {
        for (const [key, value] of Object.entries(filter)) {
          if (log[key as keyof LogEntry] !== value) {
            return false;
          }
        }
        return true;
      });
    },
    [logs],
  );

  const value: LogContextType = {
    logs,
    log,
    info,
    warn,
    error,
    clearLogs,
    deleteLogs,
    exportLogs,
    getLogs,
  };

  return <LogContext.Provider value={value}>{children}</LogContext.Provider>;
}
