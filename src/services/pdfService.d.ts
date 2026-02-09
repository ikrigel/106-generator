/**
 * PDF service
 * Handles PDF field extraction, filling, and generation
 */
import type { PdfExtractionResult, PdfFillResult, PdfGenerationOptions } from '@/types/pdf.types';
declare class PdfService {
    /**
     * Extract form fields from PDF
     */
    extractPdfFields(pdfUrl?: string): Promise<PdfExtractionResult>;
    /**
     * Generate a new PDF document from form data (no template needed)
     * Creates a clean, professional form document with user data
     */
    generatePdfFromScratch(formData: Record<string, string | boolean>): Promise<PdfFillResult>;
    /**
     * Fill PDF with data and return as Uint8Array
     * Falls back to generating from scratch if template PDF doesn't have form fields
     */
    fillPdfFields(formData: Record<string, string | boolean>, pdfUrl?: string): Promise<PdfFillResult>;
    /**
     * Generate and download filled PDF
     */
    generateAndDownloadPdf(formData: Record<string, string | boolean>, options?: PdfGenerationOptions, pdfUrl?: string): Promise<{
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
