/**
 * Storage service
 * High-level storage operations for all data types
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { getFromStorage, saveToStorage, removeFromStorage } from '@/utils/storage';
import { STORAGE_KEYS, APP_VERSION } from '@/constants/storage';
import { DEFAULT_SETTINGS } from '@/constants/defaults';
var StorageService = /** @class */ (function () {
    function StorageService() {
    }
    /**
     * Get theme setting from localStorage
     */
    StorageService.prototype.getTheme = function () {
        var _a;
        return (_a = getFromStorage(STORAGE_KEYS.THEME)) !== null && _a !== void 0 ? _a : 'auto';
    };
    /**
     * Save theme setting to localStorage
     */
    StorageService.prototype.setTheme = function (theme) {
        return saveToStorage(STORAGE_KEYS.THEME, theme);
    };
    /**
     * Get settings from localStorage
     */
    StorageService.prototype.getSettings = function () {
        var stored = getFromStorage(STORAGE_KEYS.SETTINGS);
        return stored !== null && stored !== void 0 ? stored : DEFAULT_SETTINGS;
    };
    /**
     * Save settings to localStorage
     */
    StorageService.prototype.setSettings = function (settings) {
        return saveToStorage(STORAGE_KEYS.SETTINGS, __assign(__assign({}, settings), { updatedAt: new Date().toISOString() }));
    };
    /**
     * Reset settings to defaults
     */
    StorageService.prototype.resetSettings = function () {
        return this.setSettings(DEFAULT_SETTINGS);
    };
    /**
     * Get form data from localStorage
     */
    StorageService.prototype.getFormData = function () {
        return getFromStorage(STORAGE_KEYS.FORM_DATA);
    };
    /**
     * Save form data to localStorage
     */
    StorageService.prototype.setFormData = function (formData) {
        return saveToStorage(STORAGE_KEYS.FORM_DATA, __assign(__assign({}, formData), { lastSaved: new Date().toISOString() }));
    };
    /**
     * Clear form data from localStorage
     */
    StorageService.prototype.clearFormData = function () {
        return removeFromStorage(STORAGE_KEYS.FORM_DATA);
    };
    /**
     * Get logs from localStorage
     */
    StorageService.prototype.getLogs = function () {
        var _a;
        return (_a = getFromStorage(STORAGE_KEYS.LOGS)) !== null && _a !== void 0 ? _a : [];
    };
    /**
     * Add a log entry
     */
    StorageService.prototype.addLog = function (entry) {
        var logs = this.getLogs();
        var settings = this.getSettings();
        // Add new log
        logs.push(entry);
        // Rotate logs if exceeding max entries
        if (logs.length > settings.logs.maxEntries) {
            logs.splice(0, logs.length - settings.logs.maxEntries);
        }
        return saveToStorage(STORAGE_KEYS.LOGS, logs);
    };
    /**
     * Save logs to localStorage
     */
    StorageService.prototype.setLogs = function (logs) {
        return saveToStorage(STORAGE_KEYS.LOGS, logs);
    };
    /**
     * Delete logs by IDs
     */
    StorageService.prototype.deleteLogs = function (ids) {
        var logs = this.getLogs();
        var filtered = logs.filter(function (log) { return !ids.includes(log.id); });
        return saveToStorage(STORAGE_KEYS.LOGS, filtered);
    };
    /**
     * Clear all logs
     */
    StorageService.prototype.clearLogs = function () {
        return removeFromStorage(STORAGE_KEYS.LOGS);
    };
    /**
     * Get cached PDF fields
     */
    StorageService.prototype.getPdfFields = function () {
        return getFromStorage(STORAGE_KEYS.PDF_FIELDS);
    };
    /**
     * Save PDF fields cache
     */
    StorageService.prototype.setPdfFields = function (cache) {
        return saveToStorage(STORAGE_KEYS.PDF_FIELDS, cache);
    };
    /**
     * Get app version from storage
     */
    StorageService.prototype.getAppVersion = function () {
        var _a;
        return (_a = getFromStorage(STORAGE_KEYS.VERSION)) !== null && _a !== void 0 ? _a : APP_VERSION;
    };
    /**
     * Set app version in storage
     */
    StorageService.prototype.setAppVersion = function (version) {
        return saveToStorage(STORAGE_KEYS.VERSION, version);
    };
    /**
     * Export all data as JSON
     */
    StorageService.prototype.exportAllData = function () {
        return {
            version: APP_VERSION,
            exportedAt: new Date().toISOString(),
            theme: this.getTheme(),
            settings: this.getSettings(),
            formData: this.getFormData(),
            logs: this.getLogs(),
            pdfFields: this.getPdfFields(),
        };
    };
    /**
     * Check storage quota usage (if available)
     */
    StorageService.prototype.getStorageInfo = function () {
        if ('storage' in navigator && 'estimate' in navigator.storage) {
            // Will be handled asynchronously in actual implementation
            return { available: true };
        }
        return { available: false };
    };
    return StorageService;
}());
export var storageService = new StorageService();
