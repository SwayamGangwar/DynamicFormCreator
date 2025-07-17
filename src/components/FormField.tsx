
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Upload, X } from 'lucide-react';
import { FormFieldConfig } from '../types/form';

interface FormFieldProps {
  field: FormFieldConfig;
  value: any;
  error?: string;
  onChange: (value: any) => void;
}

export const FormField: React.FC<FormFieldProps> = ({
  field,
  value,
  error,
  onChange
}) => {
  const { title, name, placeholder, type, data, required, min, max, resolution } = field;

  const renderInput = () => {
    switch (type) {
      case 'text':
      case 'email':
      case 'tel':
        return (
          <Input
            type={type}
            placeholder={placeholder}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className={error ? 'border-red-500' : ''}
          />
        );

      case 'number':
        return (
          <Input
            type="number"
            placeholder={placeholder}
            value={value || ''}
            min={min}
            max={max}
            step={resolution}
            onChange={(e) => onChange(e.target.value)}
            className={error ? 'border-red-500' : ''}
          />
        );

      case 'date':
        return (
          <Input
            type="date"
            value={value || ''}
            min={min}
            max={max}
            onChange={(e) => onChange(e.target.value)}
            className={error ? 'border-red-500' : ''}
          />
        );

      case 'datetime':
        return (
          <Input
            type="datetime-local"
            value={value || ''}
            min={min}
            max={max}
            onChange={(e) => onChange(e.target.value)}
            className={error ? 'border-red-500' : ''}
          />
        );

      case 'textarea':
        return (
          <Textarea
            placeholder={placeholder}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className={error ? 'border-red-500' : ''}
          />
        );

      case 'select':
        return (
          <Select value={value || ''} onValueChange={onChange}>
            <SelectTrigger className={error ? 'border-red-500' : ''}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {(data as Array<{ id: string; title: string }>)?.map(option => (
                <SelectItem key={option.id} value={option.id}>
                  {option.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'multiselect':
        const selectedValues = Array.isArray(value) ? value : [];
        return (
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {selectedValues.map((selectedId: string) => {
                const option = (data as Array<{ id: string; title: string }>)?.find(opt => opt.id === selectedId);
                return option ? (
                  <Badge key={selectedId} variant="secondary" className="flex items-center gap-1">
                    {option.title}
                    <X 
                      size={14} 
                      className="cursor-pointer hover:text-red-500"
                      onClick={() => onChange(selectedValues.filter((id: string) => id !== selectedId))}
                    />
                  </Badge>
                ) : null;
              })}
            </div>
            <div className="grid grid-cols-1 gap-2">
              {(data as Array<{ id: string; title: string }>)?.map(option => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.id}
                    checked={selectedValues.includes(option.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        onChange([...selectedValues, option.id]);
                      } else {
                        onChange(selectedValues.filter((id: string) => id !== option.id));
                      }
                    }}
                  />
                  <Label htmlFor={option.id}>{option.title}</Label>
                </div>
              ))}
            </div>
          </div>
        );

      case 'buttons':
        return (
          <div className="flex flex-wrap gap-2">
            {(data as Array<{ id: string; title: string }>)?.map(option => (
              <Button
                key={option.id}
                type="button"
                variant={value === option.id ? "default" : "outline"}
                onClick={() => onChange(option.id)}
                className="flex-1"
              >
                {option.title}
              </Button>
            ))}
          </div>
        );

      case 'typeahead':
        return (
          <div className="space-y-2">
            <Input
              placeholder={placeholder}
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              className={error ? 'border-red-500' : ''}
              list={`${name}-options`}
            />
            <datalist id={`${name}-options`}>
              {(data as Array<{ id: string; title: string }>)?.map(option => (
                <option key={option.id} value={option.id}>
                  {option.title}
                </option>
              ))}
            </datalist>
          </div>
        );

      case 'file':
        return (
          <FileUpload
            config={data as { url: string; method: string; headers?: Record<string, string> }}
            value={value}
            onChange={onChange}
            error={error}
          />
        );

      default:
        return (
          <Input
            placeholder={placeholder}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            className={error ? 'border-red-500' : ''}
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-sm font-medium">
        {title}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {renderInput()}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

const FileUpload: React.FC<{
  config: { url: string; method: string; headers?: Record<string, string> };
  value: any;
  onChange: (value: any) => void;
  error?: string;
}> = ({ config, value, onChange, error }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>('');

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    setUploadError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(config.url, {
        method: config.method,
        body: formData,
        headers: config.headers || {}
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const result = await response.json();
      onChange(result);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className={`border-2 border-dashed rounded-lg p-4 text-center ${error ? 'border-red-500' : 'border-gray-300'}`}>
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <div className="mt-2">
          <label htmlFor="file-upload" className="cursor-pointer">
            <span className="text-sm text-blue-600 hover:text-blue-500">
              Choose file to upload
            </span>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
              }}
              disabled={uploading}
            />
          </label>
        </div>
        {uploading && <p className="text-sm text-gray-500 mt-2">Uploading...</p>}
        {uploadError && <p className="text-sm text-red-600 mt-2">{uploadError}</p>}
        {value && (
          <p className="text-sm text-green-600 mt-2">
            File uploaded successfully: {typeof value === 'string' ? value : JSON.stringify(value)}
          </p>
        )}
      </div>
    </div>
  );
};
