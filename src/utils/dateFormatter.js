/**
 * Date formatting utility functions
 * Provides date formatting and manipulation helpers
 */
/**
 * Format date to ISO string (YYYY-MM-DD)
 * @param date - Date to format
 * @returns ISO string format
 */
export function toISODate(date) {
    return date.toISOString().split('T')[0];
}
/**
 * Format date to display string (MMM DD, YYYY)
 * @param date - Date to format
 * @returns Display format string
 */
export function toDisplayDate(date) {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}
/**
 * Format date to full string (Day, Month DD, YYYY)
 * @param date - Date to format
 * @returns Full format string
 */
export function toFullDate(date) {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    });
}
/**
 * Format date and time to string (MMM DD, YYYY HH:mm)
 * @param date - Date to format
 * @returns Display format string with time
 */
export function toDisplayDateTime(date) {
    var dateStr = toDisplayDate(date);
    var timeStr = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
    return "".concat(dateStr, " ").concat(timeStr);
}
/**
 * Format date to ISO string with time (YYYY-MM-DDTHH:mm:ss.sssZ)
 * @param date - Date to format
 * @returns ISO string format with time
 */
export function toISODateTime(date) {
    return date.toISOString();
}
/**
 * Parse ISO date string to Date object
 * @param isoString - ISO date string (YYYY-MM-DD or ISO DateTime)
 * @returns Date object
 */
export function parseISODate(isoString) {
    return new Date(isoString);
}
/**
 * Get relative time string (e.g., "2 hours ago")
 * @param date - Date to format
 * @returns Relative time string
 */
export function getRelativeTime(date) {
    var now = new Date();
    var diffMs = now.getTime() - date.getTime();
    var diffSecs = Math.floor(diffMs / 1000);
    var diffMins = Math.floor(diffSecs / 60);
    var diffHours = Math.floor(diffMins / 60);
    var diffDays = Math.floor(diffHours / 24);
    if (diffSecs < 60)
        return 'just now';
    if (diffMins < 60)
        return "".concat(diffMins, " minute").concat(diffMins > 1 ? 's' : '', " ago");
    if (diffHours < 24)
        return "".concat(diffHours, " hour").concat(diffHours > 1 ? 's' : '', " ago");
    if (diffDays < 7)
        return "".concat(diffDays, " day").concat(diffDays > 1 ? 's' : '', " ago");
    return toDisplayDate(date);
}
/**
 * Format filename with timestamp
 * @param baseFilename - Base filename
 * @param includeTime - Include time in timestamp
 * @returns Filename with timestamp
 */
export function formatFilenameWithTimestamp(baseFilename, includeTime) {
    if (includeTime === void 0) { includeTime = true; }
    var now = new Date();
    var date = toISODate(now);
    var time = includeTime ? "_".concat(now.getHours(), "-").concat(now.getMinutes(), "-").concat(now.getSeconds()) : '';
    var timestamp = "".concat(date).concat(time);
    return baseFilename.replace('{timestamp}', timestamp).replace(/{date}/g, date);
}
