/**
 * localStorage utility functions
 * Provides safe wrapper around localStorage with error handling
 */
/**
 * Safely get an item from localStorage
 * @param key - Storage key
 * @returns Parsed value or null if not found or error occurs
 */
export declare function getFromStorage<T>(key: string): T | null;
/**
 * Safely save an item to localStorage
 * @param key - Storage key
 * @param value - Value to save
 * @returns true if successful, false otherwise
 */
export declare function saveToStorage<T>(key: string, value: T): boolean;
/**
 * Safely remove an item from localStorage
 * @param key - Storage key
 * @returns true if successful, false otherwise
 */
export declare function removeFromStorage(key: string): boolean;
/**
 * Clear all items from localStorage
 * @returns true if successful, false otherwise
 */
export declare function clearStorage(): boolean;
/**
 * Check if localStorage is available
 * @returns true if localStorage is available, false otherwise
 */
export declare function isStorageAvailable(): boolean;
/**
 * Get all keys in localStorage
 * @returns Array of storage keys
 */
export declare function getStorageKeys(): string[];
