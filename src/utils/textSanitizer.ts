/**
 * Text sanitizer for PDF generation
 * Converts unsupported characters to ASCII-compatible alternatives
 */

// Hebrew to Latin transliteration map - Complete Unicode coverage
const HEBREW_TO_LATIN: Record<string, string> = {
  // Basic Hebrew letters
  'א': 'a',    // Alef (U+05D0)
  'ב': 'b',    // Bet (U+05D1)
  'ג': 'g',    // Gimel (U+05D2)
  'ד': 'd',    // Dalet (U+05D3)
  'ה': 'h',    // He (U+05D4)
  'ו': 'v',    // Vav (U+05D5)
  'ז': 'z',    // Zayin (U+05D6)
  'ח': 'kh',   // Het (U+05D7)
  'ט': 't',    // Tet (U+05D8)
  'י': 'y',    // Yod (U+05D9)
  'כ': 'k',    // Kaph (U+05DA)
  'ל': 'l',    // Lamed (U+05DC)
  'מ': 'm',    // Mem (U+05DE)
  'נ': 'n',    // Nun (U+05E0)
  'ס': 's',    // Samekh (U+05E1)
  'ע': 'e',    // Ayin (U+05E2)
  'פ': 'p',    // Pe (U+05E4)
  'ץ': 'tz',   // Tsade final (U+05E5)
  'צ': 'tz',   // Tsade (U+05E6)
  'ק': 'k',    // Qof (U+05E7)
  'ר': 'r',    // Resh (U+05E8)
  'ש': 'sh',   // Shin (U+05E9)
  'ת': 't',    // Tav (U+05EA)

  // Final forms
  'ך': 'k',    // Kaph final (U+05DA)
  'ם': 'm',    // Mem final (U+05DD)
  'ן': 'n',    // Nun final (U+05DF)
  'ף': 'p',    // Pe final (U+05E3)

  // Yiddish characters sometimes used
  'שׁ': 'sh',  // Shin with shin dot
  'שׂ': 'sh',  // Shin with sin dot
  'בּ': 'b',   // Bet with dagesh
  'גּ': 'g',   // Gimel with dagesh
  'דּ': 'd',   // Dalet with dagesh
  'הּ': 'h',   // He with dagesh
  'וּ': 'v',   // Vav with dagesh
  'זּ': 'z',   // Zayin with dagesh
  'טּ': 't',   // Tet with dagesh
  'יּ': 'y',   // Yod with dagesh
  'כּ': 'k',   // Kaph with dagesh
  'לּ': 'l',   // Lamed with dagesh
  'מּ': 'm',   // Mem with dagesh
  'נּ': 'n',   // Nun with dagesh
  'סּ': 's',   // Samekh with dagesh
  'פּ': 'p',   // Pe with dagesh
  'צּ': 'tz',  // Tsade with dagesh
  'קּ': 'k',   // Qof with dagesh
  'רּ': 'r',   // Resh with dagesh
  'תּ': 't',   // Tav with dagesh

  // Unicode combining marks (diacriticals - often removed or replaced with vowel)
  'ְ': '',     // Hebrew point sheva (U+05B0)
  'ָ': 'a',    // Hebrew point qamats (U+05B2)
  'ֲ': 'a',    // Hebrew point hataf qamats (U+05B2)
  'ִ': 'i',    // Hebrew point hiriq (U+05B4)
  'ֵ': 'e',    // Hebrew point tsere (U+05B5)
  'ֶ': 'e',    // Hebrew point segol (U+05B6)
  'ּ': '',     // Hebrew point dagesh (U+05BC)
  'ׁ': 'sh',   // Hebrew point shin dot (U+05C1)
  'ׂ': 'sh',   // Hebrew point sin dot (U+05C2)
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
