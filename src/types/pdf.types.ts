/**
 * PDF type definitions
 * Defines PDF-related types and interfaces
 */

export type PdfFieldType = 'text' | 'checkbox' | 'radio' | 'button' | 'signature' | 'date';

export interface PdfField {
  name: string;
  type: PdfFieldType;
  label?: string;
  value?: string | boolean;
  defaultValue?: string | boolean;
  options?: string[];
}

export interface PdfFieldsCache {
  version: string;
  fields: PdfField[];
  extractedAt: string;
}

export interface PdfGenerationOptions {
  filename?: string;
  includeTimestamp?: boolean;
  autoDownload?: boolean;
}

export interface PdfExtractionResult {
  success: boolean;
  fields: PdfField[];
  error?: string;
  message?: string;
}

export interface PdfFillResult {
  success: boolean;
  data?: Uint8Array;
  error?: string;
  message?: string;
}
