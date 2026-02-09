/**
 * Default form fields for MOC 106 Form
 * Used when PDF field extraction fails or returns no fields
 */

import type { FormField } from '@/types/form.types';

export const DEFAULT_FORM_FIELDS: FormField[] = [
  {
    name: 'name',
    type: 'text',
    label: 'Full Name',
    required: true,
    placeholder: 'Enter your full name',
    maxLength: 100,
  },
  {
    name: 'email',
    type: 'email',
    label: 'Email Address',
    required: false,
    placeholder: 'Enter your email',
    maxLength: 100,
  },
  {
    name: 'phone',
    type: 'tel',
    label: 'Phone Number',
    required: false,
    placeholder: 'Enter your phone number',
    maxLength: 20,
  },
  {
    name: 'address',
    type: 'text',
    label: 'Address',
    required: false,
    placeholder: 'Enter your address',
    maxLength: 200,
  },
  {
    name: 'city',
    type: 'text',
    label: 'City',
    required: false,
    placeholder: 'Enter your city',
    maxLength: 100,
  },
  {
    name: 'state',
    type: 'text',
    label: 'State/Province',
    required: false,
    placeholder: 'Enter state/province',
    maxLength: 100,
  },
  {
    name: 'zipcode',
    type: 'text',
    label: 'Zip/Postal Code',
    required: false,
    placeholder: 'Enter zip/postal code',
    maxLength: 20,
  },
  {
    name: 'date',
    type: 'date',
    label: 'Date',
    required: false,
  },
  {
    name: 'signature',
    type: 'text',
    label: 'Signature',
    required: false,
    placeholder: 'Enter signature',
    maxLength: 100,
  },
  {
    name: 'notes',
    type: 'textarea',
    label: 'Notes',
    required: false,
    placeholder: 'Add any additional notes',
    maxLength: 500,
  },
];
