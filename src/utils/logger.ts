/**
 * Logging utility functions
 * Provides logging utilities for console and development
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

/**
 * Format a log message with timestamp and level
 * @param level - Log level
 * @param message - Log message
 * @returns Formatted message
 */
export function formatLogMessage(level: LogLevel, message: string): string {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
}

/**
 * Log a debug message
 * @param message - Message to log
 * @param data - Optional data to log
 */
export function logDebug(message: string, data?: unknown): void {
  console.debug(formatLogMessage('debug', message), data);
}

/**
 * Log an info message
 * @param message - Message to log
 * @param data - Optional data to log
 */
export function logInfo(message: string, data?: unknown): void {
  console.info(formatLogMessage('info', message), data);
}

/**
 * Log a warning message
 * @param message - Message to log
 * @param data - Optional data to log
 */
export function logWarn(message: string, data?: unknown): void {
  console.warn(formatLogMessage('warn', message), data);
}

/**
 * Log an error message
 * @param message - Message to log
 * @param error - Optional error object
 */
export function logError(message: string, error?: unknown): void {
  console.error(formatLogMessage('error', message), error);
}

/**
 * Check if a message should be logged based on level
 * @param messageLevel - Level of the message to log
 * @param minLevel - Minimum level to log (default: 'info')
 * @returns true if message should be logged
 */
export function shouldLog(messageLevel: LogLevel, minLevel: LogLevel = 'info'): boolean {
  return LOG_LEVEL_PRIORITY[messageLevel] >= LOG_LEVEL_PRIORITY[minLevel];
}

/**
 * Generate a unique ID for logs
 * @returns UUID string
 */
export function generateLogId(): string {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
