
export interface FormFieldConfig {
  title: string;
  name: string;
  placeholder?: string;
  type: 'text' | 'buttons' | 'select' | 'multiselect' | 'typeahead' | 'number' | 'textarea' | 'tel' | 'email' | 'file' | 'date' | 'datetime' | 'card';
  validator?: string;
  min?: string;
  max?: string;
  resolution?: string;
  data?: Array<{ id: string; title: string }> | FormFieldConfig[] | { url: string; method: string; headers?: Record<string, string> };
  value?: any;
  required?: boolean;
  error?: string;
}

export interface FormData {
  [key: string]: any;
}
