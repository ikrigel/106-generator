/**
 * Form validation utility functions
 * Provides validation helpers for form fields
 */
/**
 * Validate email address
 * @param email - Email address to validate
 * @returns true if valid email
 */
export declare function isValidEmail(email: string): boolean;
/**
 * Validate phone number (basic international format)
 * @param phone - Phone number to validate
 * @returns true if valid phone number
 */
export declare function isValidPhone(phone: string): boolean;
/**
 * Validate date string (YYYY-MM-DD format)
 * @param dateString - Date string to validate
 * @returns true if valid date
 */
export declare function isValidDate(dateString: string): boolean;
/**
 * Validate URL
 * @param url - URL string to validate
 * @returns true if valid URL
 */
export declare function isValidUrl(url: string): boolean;
/**
 * Validate string length
 * @param value - String to validate
 * @param minLength - Minimum length (inclusive)
 * @param maxLength - Maximum length (inclusive)
 * @returns true if length is valid
 */
export declare function isValidLength(value: string, minLength?: number, maxLength?: number): boolean;
/**
 * Validate string matches regex pattern
 * @param value - String to validate
 * @param pattern - Regex pattern string
 * @returns true if matches pattern
 */
export declare function matchesPattern(value: string, pattern: string): boolean;
/**
 * Validate required field
 * @param value - Field value
 * @returns true if field is not empty
 */
export declare function isRequired(value: string | boolean | null | undefined): boolean;
/**
 * Get validation error message
 * @param fieldName - Name of the field
 * @param value - Field value
 * @param validation - Validation rules
 * @returns Error message or empty string if valid
 */
export declare function getValidationError(fieldName: string, value: string | boolean, validation?: {
    required?: boolean;
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    email?: boolean;
    phone?: boolean;
    url?: boolean;
    date?: boolean;
}): string;
/**
 * Validate entire form
 * @param formValues - Form field values
 * @param validationRules - Validation rules for each field
 * @returns Object with field names as keys and error messages as values
 */
export declare function validateForm(formValues: Record<string, string | boolean>, validationRules: Record<string, {
    required?: boolean;
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    email?: boolean;
    phone?: boolean;
    url?: boolean;
    date?: boolean;
}>): Record<string, string>;
