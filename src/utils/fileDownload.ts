/**
 * File download utility functions
 * Provides utilities for triggering file downloads
 */

/**
 * Trigger download of a Blob
 * @param blob - Blob to download
 * @param filename - Filename for download
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Trigger download of a PDF from Uint8Array or ArrayBuffer
 * @param data - PDF data as Uint8Array or ArrayBuffer
 * @param filename - Filename for download
 */
export function downloadPdf(data: Uint8Array | ArrayBuffer, filename: string): void {
  const blob = new Blob([data as any], { type: 'application/pdf' });
  downloadBlob(blob, filename);
}

/**
 * Trigger download of JSON data
 * @param data - Data to download as JSON
 * @param filename - Filename for download
 */
export function downloadJson<T>(data: T, filename: string): void {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  downloadBlob(blob, filename);
}

/**
 * Trigger download of CSV data
 * @param data - Array of objects to download as CSV
 * @param filename - Filename for download
 */
export function downloadCsv<T extends Record<string, unknown>>(
  data: T[],
  filename: string,
): void {
  if (data.length === 0) {
    console.warn('No data to download');
    return;
  }

  // Get headers from first object
  const headers = Object.keys(data[0]);

  // Create CSV content
  const csvContent = [
    headers.join(','),
    ...data.map((row) =>
      headers.map((header) => {
        const value = row[header];
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }),
    ),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, filename);
}

/**
 * Trigger download of text file
 * @param content - Text content to download
 * @param filename - Filename for download
 */
export function downloadText(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain' });
  downloadBlob(blob, filename);
}
