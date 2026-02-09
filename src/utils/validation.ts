/**
 * Form validation utility functions
 * Provides validation helpers for form fields
 */

/**
 * Validate email address
 * @param email - Email address to validate
 * @returns true if valid email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (basic international format)
 * @param phone - Phone number to validate
 * @returns true if valid phone number
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-()]{7,}$/;
  return phoneRegex.test(phone);
}

/**
 * Validate date string (YYYY-MM-DD format)
 * @param dateString - Date string to validate
 * @returns true if valid date
 */
export function isValidDate(dateString: string): boolean {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) return false;

  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Validate URL
 * @param url - URL string to validate
 * @returns true if valid URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate string length
 * @param value - String to validate
 * @param minLength - Minimum length (inclusive)
 * @param maxLength - Maximum length (inclusive)
 * @returns true if length is valid
 */
export function isValidLength(value: string, minLength?: number, maxLength?: number): boolean {
  if (minLength !== undefined && value.length < minLength) return false;
  if (maxLength !== undefined && value.length > maxLength) return false;
  return true;
}

/**
 * Validate string matches regex pattern
 * @param value - String to validate
 * @param pattern - Regex pattern string
 * @returns true if matches pattern
 */
export function matchesPattern(value: string, pattern: string): boolean {
  try {
    const regex = new RegExp(pattern);
    return regex.test(value);
  } catch {
    return false;
  }
}

/**
 * Validate required field
 * @param value - Field value
 * @returns true if field is not empty
 */
export function isRequired(value: string | boolean | null | undefined): boolean {
  if (typeof value === 'boolean') return true;
  if (typeof value === 'string') return value.trim().length > 0;
  return value !== null && value !== undefined;
}

/**
 * Get validation error message
 * @param fieldName - Name of the field
 * @param value - Field value
 * @param validation - Validation rules
 * @returns Error message or empty string if valid
 */
export function getValidationError(
  fieldName: string,
  value: string | boolean,
  validation?: {
    required?: boolean;
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    email?: boolean;
    phone?: boolean;
    url?: boolean;
    date?: boolean;
  },
): string {
  if (!validation) return '';

  const stringValue = String(value);

  if (validation.required && !isRequired(value)) {
    return `${fieldName} is required`;
  }

  if (stringValue.length === 0) return '';

  if (validation.email && !isValidEmail(stringValue)) {
    return `${fieldName} must be a valid email address`;
  }

  if (validation.phone && !isValidPhone(stringValue)) {
    return `${fieldName} must be a valid phone number`;
  }

  if (validation.url && !isValidUrl(stringValue)) {
    return `${fieldName} must be a valid URL`;
  }

  if (validation.date && !isValidDate(stringValue)) {
    return `${fieldName} must be a valid date (YYYY-MM-DD)`;
  }

  if (validation.minLength && !isValidLength(stringValue, validation.minLength)) {
    return `${fieldName} must be at least ${validation.minLength} characters`;
  }

  if (validation.maxLength && !isValidLength(stringValue, undefined, validation.maxLength)) {
    return `${fieldName} must be no more than ${validation.maxLength} characters`;
  }

  if (
    validation.pattern &&
    stringValue.length > 0 &&
    !matchesPattern(stringValue, validation.pattern)
  ) {
    return `${fieldName} format is invalid`;
  }

  return '';
}

/**
 * Validate entire form
 * @param formValues - Form field values
 * @param validationRules - Validation rules for each field
 * @returns Object with field names as keys and error messages as values
 */
export function validateForm(
  formValues: Record<string, string | boolean>,
  validationRules: Record<
    string,
    {
      required?: boolean;
      pattern?: string;
      minLength?: number;
      maxLength?: number;
      email?: boolean;
      phone?: boolean;
      url?: boolean;
      date?: boolean;
    }
  >,
): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const [fieldName, rules] of Object.entries(validationRules)) {
    const value = formValues[fieldName] ?? '';
    const error = getValidationError(fieldName, value, rules);
    if (error) {
      errors[fieldName] = error;
    }
  }

  return errors;
}
