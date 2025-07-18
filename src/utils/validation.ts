
import { FormFieldConfig, FormData } from '../types/form';

export const validateField = (field: FormFieldConfig, value: any): string => {
  // Check required fields
  if (field.required && (!value || (Array.isArray(value) && value.length === 0))) {
    return field.error || `${field.title} is required`;
  }

  // Skip further validation if field is empty and not required
  if (!value && !field.required) {
    return '';
  }

  // Regex validation
  if (field.validator && value) {
    const regex = new RegExp(field.validator);
    if (!regex.test(value.toString())) {
      return field.error || `Invalid ${field.title}`;
    }
  }

  // Number validation
  if (field.type === 'number' && value) {
    const num = parseFloat(value);
    if (isNaN(num)) {
      return field.error || `${field.title} must be a number`;
    }
    if (field.min && num < parseFloat(field.min)) {
      return field.error || `${field.title} must be at least ${field.min}`;
    }
    if (field.max && num > parseFloat(field.max)) {
      return field.error || `${field.title} must be at most ${field.max}`;
    }
  }

  // Date validation
  if ((field.type === 'date' || field.type === 'datetime') && value) {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return field.error || `${field.title} must be a valid date`;
    }
    if (field.min && date < new Date(field.min)) {
      return field.error || `${field.title} must be after ${field.min}`;
    }
    if (field.max && date > new Date(field.max)) {
      return field.error || `${field.title} must be before ${field.max}`;
    }
  }

  return '';
};

export const validateForm = (schema: FormFieldConfig[], formData: FormData): Record<string, string> => {
  const errors: Record<string, string> = {};

  const validateFields = (fields: FormFieldConfig[], data: FormData, prefix = '') => {
    fields.forEach(field => {
      const fieldKey = prefix ? `${prefix}.${field.name}` : field.name;
      const fieldValue = data[field.name];

      if (field.type === 'card' && field.data) {
        // Validate nested card fields
        const nestedData = fieldValue as FormData || {};
        validateFields(field.data as FormFieldConfig[], nestedData, fieldKey);
      } else {
        // Validate regular field
        const error = validateField(field, fieldValue);
        if (error) {
          errors[fieldKey] = error;
        }
      }
    });
  };

  validateFields(schema, formData);
  return errors;
};
