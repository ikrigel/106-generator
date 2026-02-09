/**
 * Storage service
 * High-level storage operations for all data types
 */
import type { Settings } from '@/types/settings.types';
import type { LogEntry } from '@/types/log.types';
import type { FormData } from '@/types/form.types';
import type { PdfFieldsCache } from '@/types/pdf.types';
import type { ThemeMode } from '@/types/theme.types';
declare class StorageService {
    /**
     * Get theme setting from localStorage
     */
    getTheme(): ThemeMode;
    /**
     * Save theme setting to localStorage
     */
    setTheme(theme: ThemeMode): boolean;
    /**
     * Get settings from localStorage
     */
    getSettings(): Settings;
    /**
     * Save settings to localStorage
     */
    setSettings(settings: Settings): boolean;
    /**
     * Reset settings to defaults
     */
    resetSettings(): boolean;
    /**
     * Get form data from localStorage
     */
    getFormData(): FormData | null;
    /**
     * Save form data to localStorage
     */
    setFormData(formData: FormData): boolean;
    /**
     * Clear form data from localStorage
     */
    clearFormData(): boolean;
    /**
     * Get logs from localStorage
     */
    getLogs(): LogEntry[];
    /**
     * Add a log entry
     */
    addLog(entry: LogEntry): boolean;
    /**
     * Save logs to localStorage
     */
    setLogs(logs: LogEntry[]): boolean;
    /**
     * Delete logs by IDs
     */
    deleteLogs(ids: string[]): boolean;
    /**
     * Clear all logs
     */
    clearLogs(): boolean;
    /**
     * Get cached PDF fields
     */
    getPdfFields(): PdfFieldsCache | null;
    /**
     * Save PDF fields cache
     */
    setPdfFields(cache: PdfFieldsCache): boolean;
    /**
     * Get app version from storage
     */
    getAppVersion(): string;
    /**
     * Set app version in storage
     */
    setAppVersion(version: string): boolean;
    /**
     * Export all data as JSON
     */
    exportAllData(): {
        version: string;
        exportedAt: string;
        theme: ThemeMode;
        settings: Settings;
        formData: FormData;
        logs: LogEntry[];
        pdfFields: PdfFieldsCache;
    };
    /**
     * Check storage quota usage (if available)
     */
    getStorageInfo(): {
        available: boolean;
        approximate?: number;
    };
}
export declare const storageService: StorageService;
export {};
