/**
 * Date formatting utility functions
 * Provides date formatting and manipulation helpers
 */

/**
 * Format date to ISO string (YYYY-MM-DD)
 * @param date - Date to format
 * @returns ISO string format
 */
export function toISODate(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Format date to display string (MMM DD, YYYY)
 * @param date - Date to format
 * @returns Display format string
 */
export function toDisplayDate(date: Date): string {
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
export function toFullDate(date: Date): string {
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
export function toDisplayDateTime(date: Date): string {
  const dateStr = toDisplayDate(date);
  const timeStr = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  return `${dateStr} ${timeStr}`;
}

/**
 * Format date to ISO string with time (YYYY-MM-DDTHH:mm:ss.sssZ)
 * @param date - Date to format
 * @returns ISO string format with time
 */
export function toISODateTime(date: Date): string {
  return date.toISOString();
}

/**
 * Parse ISO date string to Date object
 * @param isoString - ISO date string (YYYY-MM-DD or ISO DateTime)
 * @returns Date object
 */
export function parseISODate(isoString: string): Date {
  return new Date(isoString);
}

/**
 * Get relative time string (e.g., "2 hours ago")
 * @param date - Date to format
 * @returns Relative time string
 */
export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return 'just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

  return toDisplayDate(date);
}

/**
 * Format filename with timestamp
 * @param baseFilename - Base filename
 * @param includeTime - Include time in timestamp
 * @returns Filename with timestamp
 */
export function formatFilenameWithTimestamp(
  baseFilename: string,
  includeTime: boolean = true,
): string {
  const now = new Date();
  const date = toISODate(now);
  const time = includeTime ? `_${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}` : '';
  const timestamp = `${date}${time}`;

  return baseFilename.replace('{timestamp}', timestamp).replace(/{date}/g, date);
}
