/**
 * PDF service
 * Handles PDF field extraction, filling, and generation
 */
import { type Language } from '@/constants/i18n';
import type { PdfExtractionResult, PdfFillResult, PdfGenerationOptions } from '@/types/pdf.types';
declare class PdfService {
    /**
     * Extract form fields from PDF
     */
    extractPdfFields(pdfUrl?: string): Promise<PdfExtractionResult>;
    /**
     * Generate a new PDF document from form data (no template needed)
     * Creates a clean, professional form document with user data
     * @param formData Form data to populate
     * @param language Language for PDF (en or he)
     */
    generatePdfFromScratch(formData: Record<string, string | boolean>, language?: Language): Promise<PdfFillResult>;
    /**
     * Fill PDF with data and return as Uint8Array
     * Falls back to generating from scratch if template PDF doesn't have form fields
     * @param formData Form data to populate
     * @param pdfUrl URL to PDF template
     * @param language Language for PDF (en or he)
     */
    fillPdfFields(formData: Record<string, string | boolean>, pdfUrl?: string, language?: Language): Promise<PdfFillResult>;
    /**
     * Generate and download filled PDF
     * @param formData Form data to populate
     * @param options PDF generation options
     * @param pdfUrl URL to PDF template
     * @param language Language for PDF (en or he)
     */
    generateAndDownloadPdf(formData: Record<string, string | boolean>, options?: PdfGenerationOptions, pdfUrl?: string, language?: Language): Promise<{
        success: boolean;
        error?: string;
        message?: string;
    }>;
    /**
     * Derive human-readable label from field name
     * Converts "firstName" to "First Name"
     */
    private deriveLabel;
}
export declare const pdfService: PdfService;
export {};
