/**
 * Logging utility functions
 * Provides logging utilities for console and development
 */
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';
/**
 * Format a log message with timestamp and level
 * @param level - Log level
 * @param message - Log message
 * @returns Formatted message
 */
export declare function formatLogMessage(level: LogLevel, message: string): string;
/**
 * Log a debug message
 * @param message - Message to log
 * @param data - Optional data to log
 */
export declare function logDebug(message: string, data?: unknown): void;
/**
 * Log an info message
 * @param message - Message to log
 * @param data - Optional data to log
 */
export declare function logInfo(message: string, data?: unknown): void;
/**
 * Log a warning message
 * @param message - Message to log
 * @param data - Optional data to log
 */
export declare function logWarn(message: string, data?: unknown): void;
/**
 * Log an error message
 * @param message - Message to log
 * @param error - Optional error object
 */
export declare function logError(message: string, error?: unknown): void;
/**
 * Check if a message should be logged based on level
 * @param messageLevel - Level of the message to log
 * @param minLevel - Minimum level to log (default: 'info')
 * @returns true if message should be logged
 */
export declare function shouldLog(messageLevel: LogLevel, minLevel?: LogLevel): boolean;
/**
 * Generate a unique ID for logs
 * @returns UUID string
 */
export declare function generateLogId(): string;
