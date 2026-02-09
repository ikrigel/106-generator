/**
 * Date formatting utility functions
 * Provides date formatting and manipulation helpers
 */
/**
 * Format date to ISO string (YYYY-MM-DD)
 * @param date - Date to format
 * @returns ISO string format
 */
export declare function toISODate(date: Date): string;
/**
 * Format date to display string (MMM DD, YYYY)
 * @param date - Date to format
 * @returns Display format string
 */
export declare function toDisplayDate(date: Date): string;
/**
 * Format date to full string (Day, Month DD, YYYY)
 * @param date - Date to format
 * @returns Full format string
 */
export declare function toFullDate(date: Date): string;
/**
 * Format date and time to string (MMM DD, YYYY HH:mm)
 * @param date - Date to format
 * @returns Display format string with time
 */
export declare function toDisplayDateTime(date: Date): string;
/**
 * Format date to ISO string with time (YYYY-MM-DDTHH:mm:ss.sssZ)
 * @param date - Date to format
 * @returns ISO string format with time
 */
export declare function toISODateTime(date: Date): string;
/**
 * Parse ISO date string to Date object
 * @param isoString - ISO date string (YYYY-MM-DD or ISO DateTime)
 * @returns Date object
 */
export declare function parseISODate(isoString: string): Date;
/**
 * Get relative time string (e.g., "2 hours ago")
 * @param date - Date to format
 * @returns Relative time string
 */
export declare function getRelativeTime(date: Date): string;
/**
 * Format filename with timestamp
 * @param baseFilename - Base filename
 * @param includeTime - Include time in timestamp
 * @returns Filename with timestamp
 */
export declare function formatFilenameWithTimestamp(baseFilename: string, includeTime?: boolean): string;
