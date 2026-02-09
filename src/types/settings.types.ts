/**
 * Settings type definitions
 * Defines user preferences and application settings
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface UserSettings {
  defaultValues: Record<string, string>;
  autoSave: boolean;
  autoSaveInterval: number; // in milliseconds
}

export interface PdfSettings {
  downloadFilename: string;
  includeTimestamp: boolean;
}

export interface LogSettings {
  enabled: boolean;
  maxEntries: number;
  logLevel: LogLevel;
}

export interface Settings {
  version: string;
  user: UserSettings;
  pdf: PdfSettings;
  logs: LogSettings;
  createdAt: string;
  updatedAt: string;
}

export interface SettingsContextType {
  settings: Settings;
  updateSettings: (updates: Partial<Settings>) => void;
  resetSettings: () => void;
  exportSettings: () => void;
  importSettings: (file: File) => Promise<void>;
}
