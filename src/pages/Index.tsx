
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FormCreator } from '@/components/FormCreator';
import { basicForm, selectForm, complexForm } from '@/data/sampleForms';
import { FormData } from '@/types/form';
import { CheckCircle, Code, FileText, Settings } from 'lucide-react';

const Index = () => {
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const [activeTab, setActiveTab] = useState('basic');

  const handleFormSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    setSubmittedData(data);
  };

  const forms = {
    basic: { schema: basicForm, title: 'Basic Form' },
    select: { schema: selectForm, title: 'Select & Multiselect' },
    complex: { schema: complexForm, title: 'Complex Form with Nested Cards' }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Dynamic Form Creator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A powerful form builder that dynamically renders forms from JSON configuration with real-time validation, nested forms, and file uploads.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Settings className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold">Dynamic Rendering</h3>
              <p className="text-sm text-gray-600">JSON-driven form generation</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold">Real-time Validation</h3>
              <p className="text-sm text-gray-600">Instant feedback & validation</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <FileText className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold">Nested Forms</h3>
              <p className="text-sm text-gray-600">Card-based sub-forms</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Code className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-semibold">File Uploads</h3>
              <p className="text-sm text-gray-600">Custom endpoint support</p>
            </CardContent>
          </Card>
        </div>

        {/* Form Examples */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="select">Select</TabsTrigger>
                <TabsTrigger value="complex">Complex</TabsTrigger>
              </TabsList>
              
              {Object.entries(forms).map(([key, form]) => (
                <TabsContent key={key} value={key}>
                  <FormCreator
                    schema={form.schema}
                    title={form.title}
                    onSubmit={handleFormSubmit}
                  />
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <div className="space-y-6">
            {/* Form Schema Display */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Current Form Schema
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto max-h-96">
                  {JSON.stringify(forms[activeTab as keyof typeof forms].schema, null, 2)}
                </pre>
              </CardContent>
            </Card>

            {/* Submitted Data Display */}
            {submittedData && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Submitted Data
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      Form submitted successfully!
                    </Badge>
                  </div>
                  <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto max-h-96">
                    {JSON.stringify(submittedData, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            )}

            {/* Supported Field Types */}
            <Card>
              <CardHeader>
                <CardTitle>Supported Field Types</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'text', 'email', 'tel', 'number', 'textarea', 'date', 'datetime',
                    'select', 'multiselect', 'buttons', 'typeahead', 'file', 'card'
                  ].map(type => (
                    <Badge key={type} variant="secondary" className="justify-center">
                      {type}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600">
          <p>Built with React, TypeScript, and Tailwind CSS</p>
          <p className="mt-2">Supports all field types, validation, nested forms, and file uploads</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
