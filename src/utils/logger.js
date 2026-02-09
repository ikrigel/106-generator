/**
 * Logging utility functions
 * Provides logging utilities for console and development
 */
var LOG_LEVEL_PRIORITY = {
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
export function formatLogMessage(level, message) {
    var timestamp = new Date().toISOString();
    return "[".concat(timestamp, "] [").concat(level.toUpperCase(), "] ").concat(message);
}
/**
 * Log a debug message
 * @param message - Message to log
 * @param data - Optional data to log
 */
export function logDebug(message, data) {
    console.debug(formatLogMessage('debug', message), data);
}
/**
 * Log an info message
 * @param message - Message to log
 * @param data - Optional data to log
 */
export function logInfo(message, data) {
    console.info(formatLogMessage('info', message), data);
}
/**
 * Log a warning message
 * @param message - Message to log
 * @param data - Optional data to log
 */
export function logWarn(message, data) {
    console.warn(formatLogMessage('warn', message), data);
}
/**
 * Log an error message
 * @param message - Message to log
 * @param error - Optional error object
 */
export function logError(message, error) {
    console.error(formatLogMessage('error', message), error);
}
/**
 * Check if a message should be logged based on level
 * @param messageLevel - Level of the message to log
 * @param minLevel - Minimum level to log (default: 'info')
 * @returns true if message should be logged
 */
export function shouldLog(messageLevel, minLevel) {
    if (minLevel === void 0) { minLevel = 'info'; }
    return LOG_LEVEL_PRIORITY[messageLevel] >= LOG_LEVEL_PRIORITY[minLevel];
}
/**
 * Generate a unique ID for logs
 * @returns UUID string
 */
export function generateLogId() {
    return "".concat(Date.now(), "_").concat(Math.random().toString(36).substr(2, 9));
}
