/**
 * File download utility functions
 * Provides utilities for triggering file downloads
 */
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/**
 * Trigger download of a Blob
 * @param blob - Blob to download
 * @param filename - Filename for download
 */
export function downloadBlob(blob, filename) {
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
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
export function downloadPdf(data, filename) {
    var blob = new Blob([data], { type: 'application/pdf' });
    downloadBlob(blob, filename);
}
/**
 * Trigger download of JSON data
 * @param data - Data to download as JSON
 * @param filename - Filename for download
 */
export function downloadJson(data, filename) {
    var jsonString = JSON.stringify(data, null, 2);
    var blob = new Blob([jsonString], { type: 'application/json' });
    downloadBlob(blob, filename);
}
/**
 * Trigger download of CSV data
 * @param data - Array of objects to download as CSV
 * @param filename - Filename for download
 */
export function downloadCsv(data, filename) {
    if (data.length === 0) {
        console.warn('No data to download');
        return;
    }
    // Get headers from first object
    var headers = Object.keys(data[0]);
    // Create CSV content
    var csvContent = __spreadArray([
        headers.join(',')
    ], data.map(function (row) {
        return headers.map(function (header) {
            var value = row[header];
            if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
                return "\"".concat(value.replace(/"/g, '""'), "\"");
            }
            return value;
        });
    }), true).join('\n');
    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    downloadBlob(blob, filename);
}
/**
 * Trigger download of text file
 * @param content - Text content to download
 * @param filename - Filename for download
 */
export function downloadText(content, filename) {
    var blob = new Blob([content], { type: 'text/plain' });
    downloadBlob(blob, filename);
}
