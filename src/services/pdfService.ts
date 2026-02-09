/**
 * PDF service
 * Handles PDF field extraction, filling, and generation
 */

import { PDFDocument, rgb } from 'pdf-lib';
import { storageService } from './storageService';
import { downloadPdf } from '@/utils/fileDownload';
import { generateLogId } from '@/utils/logger';
import { formatFilenameWithTimestamp } from '@/utils/dateFormatter';
import type { PdfField, PdfExtractionResult, PdfFillResult, PdfGenerationOptions } from '@/types/pdf.types';
import { PDF_SOURCE_URL } from '@/constants/defaults';
import { DEFAULT_FORM_FIELDS } from '@/constants/formFields';

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

      // Use default fields if no fields were extracted from PDF
      const fieldsToReturn = extractedFields.length > 0
        ? extractedFields
        : (DEFAULT_FORM_FIELDS as unknown as PdfField[]);

      // Cache the extracted fields
      const cache = {
        version: arrayBuffer.byteLength.toString(),
        fields: fieldsToReturn,
        extractedAt: new Date().toISOString(),
      };
      storageService.setPdfFields(cache);

      return {
        success: true,
        fields: fieldsToReturn,
        message: extractedFields.length > 0
          ? `Extracted ${extractedFields.length} fields from PDF`
          : `No form fields found in PDF, using default form`,
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
   * Generate a new PDF document from form data (no template needed)
   * Creates a clean, professional form document with user data
   */
  async generatePdfFromScratch(formData: Record<string, string | boolean>): Promise<PdfFillResult> {
    try {
      const pdfDoc = await PDFDocument.create();
      let page = pdfDoc.addPage([595, 842]); // A4 size

      const { width, height } = page.getSize();
      let yPosition = height - 50;
      const margin = 40;
      const lineHeight = 25;
      const sectionSpacing = 35;

      // Title
      page.drawText('MOC 106 Form - 2024', {
        x: margin,
        y: yPosition,
        size: 18,
        color: rgb(0, 0, 0),
      });
      yPosition -= sectionSpacing;

      // Form data section
      page.drawText('Form Information:', {
        x: margin,
        y: yPosition,
        size: 14,
        color: rgb(0, 0, 0),
      });
      yPosition -= lineHeight;

      // Display all form fields
      for (const [key, value] of Object.entries(formData)) {
        if (value) {
          const label = key.replace(/([A-Z])/g, ' $1').trim();
          const displayLabel = label.charAt(0).toUpperCase() + label.slice(1);
          const displayValue = String(value);

          page.drawText(`${displayLabel}:`, {
            x: margin,
            y: yPosition,
            size: 11,
            color: rgb(0, 0, 0),
          });

          // rgb values must be 0-1, not 0-255. rgb(0, 102, 204) -> rgb(0, 0.4, 0.8)
          page.drawText(displayValue, {
            x: margin + 150,
            y: yPosition,
            size: 11,
            color: rgb(0, 0.4, 0.8),
          });

          yPosition -= lineHeight;

          // Add page break if needed
          if (yPosition < 50) {
            page = pdfDoc.addPage([595, 842]);
            yPosition = height - margin;
          }
        }
      }

      // Footer with timestamp
      const timestamp = new Date().toLocaleString();
      page.drawText(`Generated: ${timestamp}`, {
        x: margin,
        y: 20,
        size: 9,
        color: rgb(0.5, 0.5, 0.5),
      });

      const pdfBytes = await pdfDoc.save();
      return {
        success: true,
        data: pdfBytes,
        message: 'PDF generated successfully',
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
   * Fill PDF with data and return as Uint8Array
   * Falls back to generating from scratch if template PDF doesn't have form fields
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
      const fields = form.getFields();

      // If no form fields exist, generate from scratch instead
      if (fields.length === 0) {
        return this.generatePdfFromScratch(formData);
      }

      // Try to fill existing form fields
      let filledAnyField = false;
      for (const [fieldName, value] of Object.entries(formData)) {
        try {
          const field = form.getFieldMaybe(fieldName) as any;
          if (!field) continue;

          filledAnyField = true;
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
            field.setText?.(String(value));
          }
        } catch (fieldError) {
          console.warn(`Error filling field ${fieldName}:`, fieldError);
        }
      }

      // If no fields were filled, generate from scratch
      if (!filledAnyField) {
        return this.generatePdfFromScratch(formData);
      }

      form.flatten();
      const pdfBytes = await pdfDoc.save();
      return {
        success: true,
        data: pdfBytes,
        message: 'PDF filled successfully',
      };
    } catch (error) {
      // Fallback to generating PDF from scratch on any error
      return this.generatePdfFromScratch(formData);
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
