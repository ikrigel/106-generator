/**
 * Default values and configuration constants
 */

import type { Settings } from '@/types/settings.types';
import { APP_VERSION } from './storage';

export const DEFAULT_SETTINGS: Settings = {
  version: APP_VERSION,
  user: {
    defaultValues: {
      // Personal Information
      name: 'פולו ❤️ מרקו',
      'full_name': 'פולו ❤️ מרקו',
      'fullName': 'פולו ❤️ מרקו',
      'firstName': 'פולו',
      'lastName': 'מרקו',
      'id_number': '123456789',
      'date_of_birth': '1990-01-01',
      'marital_status': 'Single',
      'address': '123 Main Street',
      'city': 'Tel Aviv',
      'postal_code': '12345',
      'phone': '+972-55-1234567',
      'email': 'user@example.com',

      // Income Information
      'salary_wages': '50000',
      'self_employment_income': '10000',
      'interest_income': '500',
      'dividend_income': '1000',
      'rental_income': '2000',
      'other_income': '',
      'total_income': '63500',

      // Deductions
      'professional_expenses': '5000',
      'charitable_donations': '500',
      'mortgage_interest': '3000',
      'medical_expenses': '1000',
      'life_insurance_premiums': '500',
      'education_expenses': '2000',
      'child_support_alimony': '0',
      'total_deductions': '12000',

      // Tax Information
      'taxable_income': '51500',
      'income_tax_withheld': '10000',
      'vat_paid': '2000',
      'estimated_tax_payments': '1500',
      'total_tax_credits': '500',
      'tax_due': '2500',

      // Additional Information
      'statement_date': new Date().toISOString().split('T')[0],
      'preparer_name': '',
      'preparer_signature': '',
      'taxpayer_signature': 'פולו מרקו',
      'notes': '',
    },
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
