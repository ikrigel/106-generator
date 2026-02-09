/**
 * File download utility functions
 * Provides utilities for triggering file downloads
 */
/**
 * Trigger download of a Blob
 * @param blob - Blob to download
 * @param filename - Filename for download
 */
export declare function downloadBlob(blob: Blob, filename: string): void;
/**
 * Trigger download of a PDF from Uint8Array or ArrayBuffer
 * @param data - PDF data as Uint8Array or ArrayBuffer
 * @param filename - Filename for download
 */
export declare function downloadPdf(data: Uint8Array | ArrayBuffer, filename: string): void;
/**
 * Trigger download of JSON data
 * @param data - Data to download as JSON
 * @param filename - Filename for download
 */
export declare function downloadJson<T>(data: T, filename: string): void;
/**
 * Trigger download of CSV data
 * @param data - Array of objects to download as CSV
 * @param filename - Filename for download
 */
export declare function downloadCsv<T extends Record<string, unknown>>(data: T[], filename: string): void;
/**
 * Trigger download of text file
 * @param content - Text content to download
 * @param filename - Filename for download
 */
export declare function downloadText(content: string, filename: string): void;
