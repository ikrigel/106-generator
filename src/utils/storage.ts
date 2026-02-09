/**
 * localStorage utility functions
 * Provides safe wrapper around localStorage with error handling
 */

/**
 * Safely get an item from localStorage
 * @param key - Storage key
 * @returns Parsed value or null if not found or error occurs
 */
export function getFromStorage<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    console.warn(`Failed to get item from storage (${key}):`, error);
    return null;
  }
}

/**
 * Safely save an item to localStorage
 * @param key - Storage key
 * @param value - Value to save
 * @returns true if successful, false otherwise
 */
export function saveToStorage<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`Failed to save item to storage (${key}):`, error);
    return false;
  }
}

/**
 * Safely remove an item from localStorage
 * @param key - Storage key
 * @returns true if successful, false otherwise
 */
export function removeFromStorage(key: string): boolean {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn(`Failed to remove item from storage (${key}):`, error);
    return false;
  }
}

/**
 * Clear all items from localStorage
 * @returns true if successful, false otherwise
 */
export function clearStorage(): boolean {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.warn('Failed to clear storage:', error);
    return false;
  }
}

/**
 * Check if localStorage is available
 * @returns true if localStorage is available, false otherwise
 */
export function isStorageAvailable(): boolean {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get all keys in localStorage
 * @returns Array of storage keys
 */
export function getStorageKeys(): string[] {
  try {
    return Object.keys(localStorage);
  } catch (error) {
    console.warn('Failed to get storage keys:', error);
    return [];
  }
}
