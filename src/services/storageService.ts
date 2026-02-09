/**
 * Storage service
 * High-level storage operations for all data types
 */

import { getFromStorage, saveToStorage, removeFromStorage } from '@/utils/storage';
import { STORAGE_KEYS, APP_VERSION } from '@/constants/storage';
import type { Settings } from '@/types/settings.types';
import type { LogEntry } from '@/types/log.types';
import type { FormData } from '@/types/form.types';
import type { PdfFieldsCache } from '@/types/pdf.types';
import type { ThemeMode } from '@/types/theme.types';
import { DEFAULT_SETTINGS } from '@/constants/defaults';

class StorageService {
  /**
   * Get theme setting from localStorage
   */
  getTheme(): ThemeMode {
    return getFromStorage<ThemeMode>(STORAGE_KEYS.THEME) ?? 'auto';
  }

  /**
   * Save theme setting to localStorage
   */
  setTheme(theme: ThemeMode): boolean {
    return saveToStorage(STORAGE_KEYS.THEME, theme);
  }

  /**
   * Get settings from localStorage
   */
  getSettings(): Settings {
    const stored = getFromStorage<Settings>(STORAGE_KEYS.SETTINGS);
    return stored ?? DEFAULT_SETTINGS;
  }

  /**
   * Save settings to localStorage
   */
  setSettings(settings: Settings): boolean {
    return saveToStorage(STORAGE_KEYS.SETTINGS, {
      ...settings,
      updatedAt: new Date().toISOString(),
    });
  }

  /**
   * Reset settings to defaults
   */
  resetSettings(): boolean {
    return this.setSettings(DEFAULT_SETTINGS);
  }

  /**
   * Get form data from localStorage
   */
  getFormData(): FormData | null {
    return getFromStorage<FormData>(STORAGE_KEYS.FORM_DATA);
  }

  /**
   * Save form data to localStorage
   */
  setFormData(formData: FormData): boolean {
    return saveToStorage(STORAGE_KEYS.FORM_DATA, {
      ...formData,
      lastSaved: new Date().toISOString(),
    });
  }

  /**
   * Clear form data from localStorage
   */
  clearFormData(): boolean {
    return removeFromStorage(STORAGE_KEYS.FORM_DATA);
  }

  /**
   * Get logs from localStorage
   */
  getLogs(): LogEntry[] {
    return getFromStorage<LogEntry[]>(STORAGE_KEYS.LOGS) ?? [];
  }

  /**
   * Add a log entry
   */
  addLog(entry: LogEntry): boolean {
    const logs = this.getLogs();
    const settings = this.getSettings();

    // Add new log
    logs.push(entry);

    // Rotate logs if exceeding max entries
    if (logs.length > settings.logs.maxEntries) {
      logs.splice(0, logs.length - settings.logs.maxEntries);
    }

    return saveToStorage(STORAGE_KEYS.LOGS, logs);
  }

  /**
   * Save logs to localStorage
   */
  setLogs(logs: LogEntry[]): boolean {
    return saveToStorage(STORAGE_KEYS.LOGS, logs);
  }

  /**
   * Delete logs by IDs
   */
  deleteLogs(ids: string[]): boolean {
    const logs = this.getLogs();
    const filtered = logs.filter((log) => !ids.includes(log.id));
    return saveToStorage(STORAGE_KEYS.LOGS, filtered);
  }

  /**
   * Clear all logs
   */
  clearLogs(): boolean {
    return removeFromStorage(STORAGE_KEYS.LOGS);
  }

  /**
   * Get cached PDF fields
   */
  getPdfFields(): PdfFieldsCache | null {
    return getFromStorage<PdfFieldsCache>(STORAGE_KEYS.PDF_FIELDS);
  }

  /**
   * Save PDF fields cache
   */
  setPdfFields(cache: PdfFieldsCache): boolean {
    return saveToStorage(STORAGE_KEYS.PDF_FIELDS, cache);
  }

  /**
   * Get app version from storage
   */
  getAppVersion(): string {
    return getFromStorage<string>(STORAGE_KEYS.VERSION) ?? APP_VERSION;
  }

  /**
   * Set app version in storage
   */
  setAppVersion(version: string): boolean {
    return saveToStorage(STORAGE_KEYS.VERSION, version);
  }

  /**
   * Export all data as JSON
   */
  exportAllData() {
    return {
      version: APP_VERSION,
      exportedAt: new Date().toISOString(),
      theme: this.getTheme(),
      settings: this.getSettings(),
      formData: this.getFormData(),
      logs: this.getLogs(),
      pdfFields: this.getPdfFields(),
    };
  }

  /**
   * Check storage quota usage (if available)
   */
  getStorageInfo(): { available: boolean; approximate?: number } {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      // Will be handled asynchronously in actual implementation
      return { available: true };
    }
    return { available: false };
  }
}

export const storageService = new StorageService();
