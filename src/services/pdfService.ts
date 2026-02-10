/**
 * PDF service
 * Handles PDF field extraction, filling, and generation
 */

import { PDFDocument, rgb } from 'pdf-lib';
import { storageService } from './storageService';
import { downloadPdf } from '@/utils/fileDownload';
import { generateLogId } from '@/utils/logger';
import { formatFilenameWithTimestamp } from '@/utils/dateFormatter';
import { sanitizeForPdf } from '@/utils/textSanitizer';
import { translations, type Language } from '@/constants/i18n';
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
   * @param formData Form data to populate
   * @param language Language for PDF (en or he)
   */
  async generatePdfFromScratch(
    formData: Record<string, string | boolean>,
    language: Language = 'en'
  ): Promise<PdfFillResult> {
    try {
      const pdfDoc = await PDFDocument.create();
      let page = pdfDoc.addPage([595, 842]); // A4 size

      const { width, height } = page.getSize();
      let yPosition = height - 40;
      const margin = 30;
      const lineHeight = 18;
      const sectionSpacing = 25;
      const labelWidth = 180;

      // Helper function to add section title
      const addSection = (title: string) => {
        if (yPosition < 80) {
          page = pdfDoc.addPage([595, 842]);
          yPosition = height - margin;
        }

        yPosition -= 8;
        page.drawText(title, {
          x: margin,
          y: yPosition,
          size: 13,
          color: rgb(0, 0.2, 0.6),
        });
        yPosition -= sectionSpacing;
      };

      // Helper function to add a form field row
      const addField = (label: string, value: string | boolean | undefined) => {
        if (!value) return;

        if (yPosition < 50) {
          page = pdfDoc.addPage([595, 842]);
          yPosition = height - margin;
        }

        const displayValue = String(value);
        const sanitizedLabel = sanitizeForPdf(`${label}:`);
        const sanitizedValue = sanitizeForPdf(displayValue);

        // Draw label
        page.drawText(sanitizedLabel, {
          x: margin,
          y: yPosition,
          size: 10,
          color: rgb(0, 0, 0),
        });

        // Draw value
        page.drawText(sanitizedValue, {
          x: margin + labelWidth,
          y: yPosition,
          size: 10,
          color: rgb(0, 0.4, 0.8),
        });

        yPosition -= lineHeight;
      };

      // Get translations for this language
      const translate = (key: keyof typeof translations.en): string => {
        return (translations as Record<Language, Record<string, string>>)[language][key] || String(key);
      };

      // Title
      page.drawText(translate('mocFormTitle'), {
        x: margin,
        y: yPosition,
        size: 16,
        color: rgb(0, 0, 0),
      });
      yPosition -= sectionSpacing + 10;

      // Personal Information Section
      addSection(translate('personalInformation'));
      addField(translate('full_name'), formData.full_name);
      addField(translate('id_number'), formData.id_number);
      addField(translate('date_of_birth'), formData.date_of_birth);
      addField(translate('marital_status'), formData.marital_status);
      addField(translate('address'), formData.address);
      addField(translate('city'), formData.city);
      addField(translate('postal_code'), formData.postal_code);
      addField(translate('phone'), formData.phone);
      addField(translate('email'), formData.email);

      // Income Information Section
      addSection(translate('incomeInformation'));
      addField(translate('salary_wages'), formData.salary_wages);
      addField(translate('self_employment_income'), formData.self_employment_income);
      addField(translate('interest_income'), formData.interest_income);
      addField(translate('dividend_income'), formData.dividend_income);
      addField(translate('rental_income'), formData.rental_income);
      addField(translate('other_income'), formData.other_income);
      addField(translate('total_income'), formData.total_income);

      // Deductions Section
      addSection(translate('deductions'));
      addField(translate('professional_expenses'), formData.professional_expenses);
      addField(translate('charitable_donations'), formData.charitable_donations);
      addField(translate('mortgage_interest'), formData.mortgage_interest);
      addField(translate('medical_expenses'), formData.medical_expenses);
      addField(translate('life_insurance_premiums'), formData.life_insurance_premiums);
      addField(translate('education_expenses'), formData.education_expenses);
      addField(translate('child_support_alimony'), formData.child_support_alimony);
      addField(translate('total_deductions'), formData.total_deductions);

      // Tax Information Section
      addSection(translate('taxCalculation'));
      addField(translate('taxable_income'), formData.taxable_income);
      addField(translate('income_tax_withheld'), formData.income_tax_withheld);
      addField(translate('vat_paid'), formData.vat_paid);
      addField(translate('estimated_tax_payments'), formData.estimated_tax_payments);
      addField(translate('total_tax_credits'), formData.total_tax_credits);
      addField(translate('tax_due'), formData.tax_due);

      // Additional Information Section
      addSection(translate('additionalInformation'));
      addField(translate('statement_date'), formData.statement_date);
      addField(translate('preparer_name'), formData.preparer_name);
      addField(translate('preparer_signature'), formData.preparer_signature);
      addField(translate('taxpayer_signature'), formData.taxpayer_signature);
      addField(translate('notes'), formData.notes);

      // Footer with timestamp
      const timestamp = new Date().toLocaleString();
      page.drawText(`${translate('generatedDate')} ${timestamp}`, {
        x: margin,
        y: 25,
        size: 8,
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
   * @param formData Form data to populate
   * @param pdfUrl URL to PDF template
   * @param language Language for PDF (en or he)
   */
  async fillPdfFields(
    formData: Record<string, string | boolean>,
    pdfUrl: string = PDF_SOURCE_URL,
    language: Language = 'en'
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
        return this.generatePdfFromScratch(formData, language);
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
        return this.generatePdfFromScratch(formData, language);
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
      return this.generatePdfFromScratch(formData, language);
    }
  }

  /**
   * Generate and download filled PDF
   * @param formData Form data to populate
   * @param options PDF generation options
   * @param pdfUrl URL to PDF template
   * @param language Language for PDF (en or he)
   */
  async generateAndDownloadPdf(
    formData: Record<string, string | boolean>,
    options: PdfGenerationOptions = {},
    pdfUrl: string = PDF_SOURCE_URL,
    language: Language = 'en'
  ): Promise<{
    success: boolean;
    error?: string;
    message?: string;
  }> {
    try {
      const fillResult = await this.fillPdfFields(formData, pdfUrl, language);
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
