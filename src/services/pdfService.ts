/**
 * PDF service
 * Handles PDF field extraction, filling, and generation
 */

import { PDFDocument } from 'pdf-lib';
import { storageService } from './storageService';
import { downloadPdf } from '@/utils/fileDownload';
import { generateLogId } from '@/utils/logger';
import { formatFilenameWithTimestamp } from '@/utils/dateFormatter';
import type { PdfField, PdfExtractionResult, PdfFillResult, PdfGenerationOptions } from '@/types/pdf.types';
import { PDF_SOURCE_URL } from '@/constants/defaults';

class PdfService {
  /**
   * Extract form fields from PDF
   */
  async extractPdfFields(pdfUrl: string = PDF_SOURCE_URL): Promise<PdfExtractionResult> {
    try {
      const response = await fetch(pdfUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch PDF: ${response.statusText}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const form = pdfDoc.getForm();
      const fields = form.getFields();

      const extractedFields: PdfField[] = [];

      for (const field of fields) {
        const name = field.getName();
        const fieldType = field.constructor.name;

        // Map pdf-lib field types to our field types
        let type: PdfField['type'] = 'text';
        if (fieldType.includes('Text')) {
          type = 'text';
        } else if (fieldType.includes('CheckBox')) {
          type = 'checkbox';
        } else if (fieldType.includes('Radio')) {
          type = 'radio';
        } else if (fieldType.includes('Signature')) {
          type = 'signature';
        } else if (fieldType.includes('Button')) {
          type = 'button';
        } else if (fieldType.includes('Date')) {
          type = 'date';
        }

        // Get field options if available
        let options: string[] | undefined;
        try {
          if (type === 'radio' || type === 'button') {
            // Radio and button fields may have options
            const fieldObject = (field as unknown) as { ___options?: string[] };
            options = fieldObject?.___options;
          }
        } catch {
          // Ignore errors when getting options
        }

        extractedFields.push({
          name,
          type,
          label: this.deriveLabel(name),
          options,
        });
      }

      // Cache the extracted fields
      const cache = {
        version: arrayBuffer.byteLength.toString(),
        fields: extractedFields,
        extractedAt: new Date().toISOString(),
      };
      storageService.setPdfFields(cache);

      return {
        success: true,
        fields: extractedFields,
        message: `Extracted ${extractedFields.length} fields from PDF`,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        fields: [],
        error: errorMessage,
        message: `Failed to extract PDF fields: ${errorMessage}`,
      };
    }
  }

  /**
   * Fill PDF with data and return as Uint8Array
   */
  async fillPdfFields(
    formData: Record<string, string | boolean>,
    pdfUrl: string = PDF_SOURCE_URL,
  ): Promise<PdfFillResult> {
    try {
      const response = await fetch(pdfUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch PDF: ${response.statusText}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const form = pdfDoc.getForm();

      // Fill form fields
      for (const [fieldName, value] of Object.entries(formData)) {
        try {
          const field = form.getFieldMaybe(fieldName) as any;
          if (!field) continue;

          const fieldType = field.constructor.name;

          if (fieldType.includes('CheckBox')) {
            if (value === true) {
              field.check?.();
            } else {
              field.uncheck?.();
            }
          } else if (fieldType.includes('Radio') || fieldType.includes('Button')) {
            field.select?.(String(value));
          } else if (fieldType.includes('Text')) {
            field.setText?.(String(value));
          } else {
            // Default: treat as text
            field.setText?.(String(value));
          }
        } catch (fieldError) {
          // Log field-level errors but continue processing
          console.warn(`Error filling field ${fieldName}:`, fieldError);
        }
      }

      // Flatten the form to make it uneditable (optional, improves compatibility)
      form.flatten();

      const pdfBytes = await pdfDoc.save();
      return {
        success: true,
        data: pdfBytes,
        message: 'PDF filled successfully',
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        error: errorMessage,
        message: `Failed to fill PDF: ${errorMessage}`,
      };
    }
  }

  /**
   * Generate and download filled PDF
   */
  async generateAndDownloadPdf(
    formData: Record<string, string | boolean>,
    options: PdfGenerationOptions = {},
    pdfUrl: string = PDF_SOURCE_URL,
  ): Promise<{
    success: boolean;
    error?: string;
    message?: string;
  }> {
    try {
      const fillResult = await this.fillPdfFields(formData, pdfUrl);
      if (!fillResult.success || !fillResult.data) {
        return {
          success: false,
          error: fillResult.error,
          message: fillResult.message,
        };
      }

      // Generate filename
      const baseFilename = options.filename || 'MOC_106_Form_{timestamp}.pdf';
      const finalFilename = formatFilenameWithTimestamp(baseFilename, options.includeTimestamp !== false);

      // Download if not explicitly disabled
      if (options.autoDownload !== false) {
        downloadPdf(fillResult.data, finalFilename);
      }

      return {
        success: true,
        message: `PDF generated successfully: ${finalFilename}`,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        success: false,
        error: errorMessage,
        message: `Failed to generate PDF: ${errorMessage}`,
      };
    }
  }

  /**
   * Derive human-readable label from field name
   * Converts "firstName" to "First Name"
   */
  private deriveLabel(fieldName: string): string {
    return (
      fieldName
        // Insert space before uppercase letters
        .replace(/([A-Z])/g, ' $1')
        // Replace underscores with spaces
        .replace(/_/g, ' ')
        // Capitalize first letter of each word
        .replace(/\b\w/g, (char) => char.toUpperCase())
        // Clean up extra spaces
        .trim()
    );
  }
}

export const pdfService = new PdfService();
