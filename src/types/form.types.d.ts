/**
 * Form type definitions
 * Defines form field and form state types
 */
export type FieldType = 'text' | 'checkbox' | 'radio' | 'dropdown' | 'signature' | 'date' | 'email' | 'tel' | 'textarea';
export interface FieldValidation {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    required?: boolean;
}
export interface FormField {
    name: string;
    type: FieldType;
    label: string;
    required: boolean;
    defaultValue?: string | boolean;
    placeholder?: string;
    maxLength?: number;
    options?: string[];
    validation?: FieldValidation;
}
export interface FormData {
    version: string;
    fields: Record<string, string | boolean>;
    lastSaved: string;
    isComplete: boolean;
}
export interface FormState {
    values: Record<string, string | boolean>;
    errors: Record<string, string>;
    touched: Record<string, boolean>;
    isSubmitting: boolean;
    isDirty: boolean;
}
export interface FormContextType {
    fields: FormField[];
    formState: FormState;
    setFieldValue: (name: string, value: string | boolean) => void;
    setFieldError: (name: string, error: string) => void;
    setFieldTouched: (name: string, touched: boolean) => void;
    resetForm: () => void;
    submitForm: () => Promise<void>;
    isFormValid: () => boolean;
}
