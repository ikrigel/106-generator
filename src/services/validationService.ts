/**
 * Validation service
 * Handles form validation logic
 */

import { validateForm, getValidationError } from '@/utils/validation';
import type { FormField } from '@/types/form.types';

class ValidationService {
  /**
   * Validate form based on fields and values
   */
  validateFormFields(
    fields: FormField[] | any[],
    formValues: Record<string, string | boolean>,
  ): Record<string, string> {
    const validationRules: Record<
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
    > = {};

    // Build validation rules from fields
    for (const field of fields) {
      const rules: Record<string, unknown> = {};

      if (field.required) {
        rules.required = true;
      }

      if (field.validation?.pattern) {
        rules.pattern = field.validation.pattern;
      }

      if (field.validation?.minLength) {
        rules.minLength = field.validation.minLength;
      }

      if (field.validation?.maxLength) {
        rules.maxLength = field.validation.maxLength;
      }

      // Infer validation rules from field type
      if (field.type === 'email') {
        rules.email = true;
      } else if (field.type === 'tel') {
        rules.phone = true;
      } else if (field.type === 'date') {
        rules.date = true;
      }

      validationRules[field.name] = rules as never;
    }

    return validateForm(formValues, validationRules);
  }

  /**
   * Validate a single field
   */
  validateField(field: FormField, value: string | boolean): string {
    const validation: Record<string, unknown> = {};

    if (field.required) {
      validation.required = true;
    }

    if (field.validation?.pattern) {
      validation.pattern = field.validation.pattern;
    }

    if (field.validation?.minLength) {
      validation.minLength = field.validation.minLength;
    }

    if (field.validation?.maxLength) {
      validation.maxLength = field.validation.maxLength;
    }

    if (field.type === 'email') {
      validation.email = true;
    } else if (field.type === 'tel') {
      validation.phone = true;
    } else if (field.type === 'date') {
      validation.date = true;
    }

    return getValidationError(field.label || field.name, value, validation as never);
  }

  /**
   * Check if form is valid
   */
  isFormValid(
    fields: FormField[],
    formValues: Record<string, string | boolean>,
  ): boolean {
    const errors = this.validateFormFields(fields, formValues);
    return Object.keys(errors).length === 0;
  }

  /**
   * Check if all required fields are filled
   */
  areRequiredFieldsFilled(
    fields: FormField[],
    formValues: Record<string, string | boolean>,
  ): boolean {
    for (const field of fields) {
      if (field.required) {
        const value = formValues[field.name];
        if (typeof value === 'string') {
          if (value.trim().length === 0) return false;
        } else if (typeof value === 'boolean') {
          if (!value) return false;
        } else if (value === null || value === undefined) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Get first error in form
   */
  getFirstError(errors: Record<string, string>): string | null {
    for (const error of Object.values(errors)) {
      if (error) return error;
    }
    return null;
  }

  /**
   * Get field by name
   */
  getFieldByName(fields: FormField[], fieldName: string): FormField | null {
    return fields.find((field) => field.name === fieldName) ?? null;
  }
}

export const validationService = new ValidationService();
