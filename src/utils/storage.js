/**
 * localStorage utility functions
 * Provides safe wrapper around localStorage with error handling
 */
/**
 * Safely get an item from localStorage
 * @param key - Storage key
 * @returns Parsed value or null if not found or error occurs
 */
export function getFromStorage(key) {
    try {
        var item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }
    catch (error) {
        console.warn("Failed to get item from storage (".concat(key, "):"), error);
        return null;
    }
}
/**
 * Safely save an item to localStorage
 * @param key - Storage key
 * @param value - Value to save
 * @returns true if successful, false otherwise
 */
export function saveToStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    }
    catch (error) {
        console.warn("Failed to save item to storage (".concat(key, "):"), error);
        return false;
    }
}
/**
 * Safely remove an item from localStorage
 * @param key - Storage key
 * @returns true if successful, false otherwise
 */
export function removeFromStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    }
    catch (error) {
        console.warn("Failed to remove item from storage (".concat(key, "):"), error);
        return false;
    }
}
/**
 * Clear all items from localStorage
 * @returns true if successful, false otherwise
 */
export function clearStorage() {
    try {
        localStorage.clear();
        return true;
    }
    catch (error) {
        console.warn('Failed to clear storage:', error);
        return false;
    }
}
/**
 * Check if localStorage is available
 * @returns true if localStorage is available, false otherwise
 */
export function isStorageAvailable() {
    try {
        var test = '__storage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    }
    catch (_a) {
        return false;
    }
}
/**
 * Get all keys in localStorage
 * @returns Array of storage keys
 */
export function getStorageKeys() {
    try {
        return Object.keys(localStorage);
    }
    catch (error) {
        console.warn('Failed to get storage keys:', error);
        return [];
    }
}
