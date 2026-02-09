/**
 * Default values and configuration constants
 */

import type { Settings } from '@/types/settings.types';
import { APP_VERSION } from './storage';

export const DEFAULT_SETTINGS: Settings = {
  version: APP_VERSION,
  user: {
    defaultValues: {},
    autoSave: true,
    autoSaveInterval: 30000, // 30 seconds
  },
  pdf: {
    downloadFilename: 'MOC_106_Form_{timestamp}',
    includeTimestamp: true,
  },
  logs: {
    enabled: true,
    maxEntries: 1000,
    logLevel: 'info',
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const DEFAULT_THEME = 'auto' as const;

export const PDF_SOURCE_URL = '/2024.pdf';

export const FORM_AUTO_SAVE_DELAY = 1000; // 1 second debounce before saving

export const LOG_ACTIONS = {
  APP_INITIALIZED: 'APP_INITIALIZED',
  THEME_CHANGED: 'THEME_CHANGED',
  SETTINGS_SAVED: 'SETTINGS_SAVED',
  SETTINGS_EXPORTED: 'SETTINGS_EXPORTED',
  SETTINGS_IMPORTED: 'SETTINGS_IMPORTED',
  FORM_LOADED: 'FORM_LOADED',
  FORM_FIELD_CHANGED: 'FORM_FIELD_CHANGED',
  FORM_SUBMITTED: 'FORM_SUBMITTED',
  FORM_VALIDATED: 'FORM_VALIDATED',
  FORM_SAVED: 'FORM_SAVED',
  FORM_CLEARED: 'FORM_CLEARED',
  PDF_EXTRACTED: 'PDF_EXTRACTED',
  PDF_GENERATED: 'PDF_GENERATED',
  PDF_DOWNLOADED: 'PDF_DOWNLOADED',
  PDF_ERROR: 'PDF_ERROR',
  LOGS_CLEARED: 'LOGS_CLEARED',
  LOGS_EXPORTED: 'LOGS_EXPORTED',
  ERROR: 'ERROR',
} as const;
