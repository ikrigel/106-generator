/**
 * Default values and configuration constants
 */
import type { Settings } from '@/types/settings.types';
export declare const DEFAULT_SETTINGS: Settings;
export declare const DEFAULT_THEME: "auto";
export declare const PDF_SOURCE_URL = "/2024.pdf";
export declare const FORM_AUTO_SAVE_DELAY = 1000;
export declare const LOG_ACTIONS: {
    readonly APP_INITIALIZED: "APP_INITIALIZED";
    readonly THEME_CHANGED: "THEME_CHANGED";
    readonly SETTINGS_SAVED: "SETTINGS_SAVED";
    readonly SETTINGS_EXPORTED: "SETTINGS_EXPORTED";
    readonly SETTINGS_IMPORTED: "SETTINGS_IMPORTED";
    readonly FORM_LOADED: "FORM_LOADED";
    readonly FORM_FIELD_CHANGED: "FORM_FIELD_CHANGED";
    readonly FORM_SUBMITTED: "FORM_SUBMITTED";
    readonly FORM_VALIDATED: "FORM_VALIDATED";
    readonly FORM_SAVED: "FORM_SAVED";
    readonly FORM_CLEARED: "FORM_CLEARED";
    readonly PDF_EXTRACTED: "PDF_EXTRACTED";
    readonly PDF_GENERATED: "PDF_GENERATED";
    readonly PDF_DOWNLOADED: "PDF_DOWNLOADED";
    readonly PDF_ERROR: "PDF_ERROR";
    readonly LOGS_CLEARED: "LOGS_CLEARED";
    readonly LOGS_EXPORTED: "LOGS_EXPORTED";
    readonly ERROR: "ERROR";
};
