/**
 * Text sanitizer for PDF generation
 * Converts unsupported characters to ASCII-compatible alternatives
 */

// Hebrew to Latin transliteration map
const HEBREW_TO_LATIN: Record<string, string> = {
  'א': 'a',
  'ב': 'b',
  'ג': 'g',
  'ד': 'd',
  'ה': 'h',
  'ו': 'v',
  'ז': 'z',
  'ח': 'kh',
  'ט': 't',
  'י': 'y',
  'כ': 'k',
  'ל': 'l',
  'מ': 'm',
  'נ': 'n',
  'ס': 's',
  'ע': 'e',
  'פ': 'p',
  'ץ': 'tz',
  'צ': 'tz',
  'ק': 'k',
  'ר': 'r',
  'ש': 'sh',
  'ת': 't',
  // Variants
  'ך': 'k',
  'ם': 'm',
  'ן': 'n',
};

/**
 * Sanitize text for PDF rendering
 * Converts Hebrew and other unsupported characters to ASCII equivalents
 * @param text - Text to sanitize
 * @returns Sanitized text that can be rendered in PDF
 */
export function sanitizeForPdf(text: string): string {
  if (!text) return '';

  let result = '';

  for (const char of text) {
    // Check if it's a Hebrew character
    if (HEBREW_TO_LATIN[char]) {
      result += HEBREW_TO_LATIN[char];
    }
    // Check if it's an emoji or other non-ASCII character
    else if (char.charCodeAt(0) > 127) {
      // Skip emojis and other non-ASCII characters
      // (you could add them to the map above to transliterate them)
      // For now, we'll skip unsupported characters
      if (char === '❤') {
        result += '<3'; // Replace heart emoji with text equivalent
      }
      // else skip the character
    } else {
      // Keep ASCII characters as-is
      result += char;
    }
  }

  return result.trim();
}
