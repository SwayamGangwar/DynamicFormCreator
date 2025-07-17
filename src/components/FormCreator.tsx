
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FormField } from './FormField';
import { FormData, FormFieldConfig } from '../types/form';
import { validateField, validateForm } from '../utils/validation';

interface FormCreatorProps {
  schema: FormFieldConfig[];
  onSubmit: (data: FormData) => void;
  title?: string;
}

export const FormCreator: React.FC<FormCreatorProps> = ({
  schema,
  onSubmit,
  title = "Dynamic Form"
}) => {
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');

  // Initialize form data with default values
  useEffect(() => {
    const initializeFormData = (fields: FormFieldConfig[], parentKey = ''): FormData => {
      const data: FormData = {};
      
      fields.forEach(field => {
        const fieldKey = parentKey ? `${parentKey}.${field.name}` : field.name;
        
        if (field.type === 'card' && field.data) {
          data[field.name] = initializeFormData(field.data as FormFieldConfig[], fieldKey);
        } else {
          data[field.name] = field.value || (field.type === 'multiselect' ? [] : '');
        }
      });
      
      return data;
    };

    setFormData(initializeFormData(schema));
  }, [schema]);

  const handleFieldChange = (name: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Real-time validation
    const field = findFieldByName(schema, name);
    if (field) {
      const error = validateField(field, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleNestedFieldChange = (cardName: string, fieldName: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [cardName]: {
        ...((prev[cardName] as FormData) || {}),
        [fieldName]: value
      }
    }));

    // Real-time validation for nested fields
    const cardField = findFieldByName(schema, cardName);
    if (cardField && cardField.data) {
      const nestedField = findFieldByName(cardField.data as FormFieldConfig[], fieldName);
      if (nestedField) {
        const error = validateField(nestedField, value);
        setErrors(prev => ({
          ...prev,
          [`${cardName}.${fieldName}`]: error
        }));
      }
    }
  };

  const findFieldByName = (fields: FormFieldConfig[], name: string): FormFieldConfig | null => {
    for (const field of fields) {
      if (field.name === name) {
        return field;
      }
      if (field.type === 'card' && field.data) {
        const found = findFieldByName(field.data as FormFieldConfig[], name);
        if (found) return found;
      }
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const validationErrors = validateForm(schema, formData);
      
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setIsSubmitting(false);
        return;
      }

      setErrors({});
      await onSubmit(formData);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: FormFieldConfig, isNested = false) => {
    const fieldKey = field.name;
    const fieldValue = formData[fieldKey];
    const fieldError = errors[fieldKey];

    if (field.type === 'card') {
      return (
        <Card key={fieldKey} className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg">{field.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {(field.data as FormFieldConfig[])?.map(nestedField => (
              <FormField
                key={nestedField.name}
                field={nestedField}
                value={(fieldValue as FormData)?.[nestedField.name]}
                error={errors[`${fieldKey}.${nestedField.name}`]}
                onChange={(value) => handleNestedFieldChange(fieldKey, nestedField.name, value)}
              />
            ))}
          </CardContent>
        </Card>
      );
    }

    return (
      <FormField
        key={fieldKey}
        field={field}
        value={fieldValue}
        error={fieldError}
        onChange={(value) => handleFieldChange(fieldKey, value)}
      />
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {schema.map(field => renderField(field))}
            
            {submitError && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">
                  {submitError}
                </AlertDescription>
              </Alert>
            )}
            
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Form'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
