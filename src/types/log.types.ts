/**
 * Log type definitions
 * Defines logging-related types and interfaces
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  id: string;
  timestamp: string;
  level: LogLevel;
  action: string;
  message: string;
  metadata?: Record<string, unknown>;
  userAgent?: string;
}

export interface LogContextType {
  logs: LogEntry[];
  log: (action: string, message: string, metadata?: Record<string, unknown>) => void;
  info: (action: string, message: string, metadata?: Record<string, unknown>) => void;
  warn: (action: string, message: string, metadata?: Record<string, unknown>) => void;
  error: (action: string, message: string, metadata?: Record<string, unknown>) => void;
  clearLogs: () => void;
  deleteLogs: (ids: string[]) => void;
  exportLogs: () => void;
  getLogs: (
    filter?: Partial<LogEntry>,
  ) => LogEntry[];
}
