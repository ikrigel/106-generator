/**
 * Validation service
 * Handles form validation logic
 */
import type { FormField } from '@/types/form.types';
declare class ValidationService {
    /**
     * Validate form based on fields and values
     */
    validateFormFields(fields: FormField[] | any[], formValues: Record<string, string | boolean>): Record<string, string>;
    /**
     * Validate a single field
     */
    validateField(field: FormField, value: string | boolean): string;
    /**
     * Check if form is valid
     */
    isFormValid(fields: FormField[], formValues: Record<string, string | boolean>): boolean;
    /**
     * Check if all required fields are filled
     */
    areRequiredFieldsFilled(fields: FormField[], formValues: Record<string, string | boolean>): boolean;
    /**
     * Get first error in form
     */
    getFirstError(errors: Record<string, string>): string | null;
    /**
     * Get field by name
     */
    getFieldByName(fields: FormField[], fieldName: string): FormField | null;
}
export declare const validationService: ValidationService;
export {};
