import React, { useState } from 'react';
import { usePdfFields } from '@/hooks/usePdfFields';
import { useFormState } from '@/hooks/useFormState';
import { useLogger } from '@/hooks/useLogger';
import { useSettings } from '@/hooks/useSettings';
import { pdfService } from '@/services/pdfService';
import { validationService } from '@/services/validationService';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { Loading } from '@/components/common/Loading';
import { LOG_ACTIONS } from '@/constants/defaults';

export default function FormGenerator() {
  const { fields, loading, error: pdfError } = usePdfFields();
  const { values, setFieldValue, resetForm, fillWithDefaults, isSaving } = useFormState(fields);
  const { info, error: logError } = useLogger();
  const { settings } = useSettings();
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  if (loading) {
    return <Loading message="Loading form fields..." />;
  }

  if (pdfError || fields.length === 0) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">MOC 106 Form</h1>
        <Alert
          type="error"
          title="Error"
          message={pdfError || 'No form fields found in PDF'}
        />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    const errors = validationService.validateFormFields(fields, values);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setMessage({
        type: 'error',
        text: `Please correct ${Object.keys(errors).length} field(s)`,
      });
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      info(LOG_ACTIONS.FORM_SUBMITTED, 'Form submitted for PDF generation');

      const filename = settings.pdf.downloadFilename;
      const result = await pdfService.generateAndDownloadPdf(values, {
        filename,
        includeTimestamp: settings.pdf.includeTimestamp,
      });

      if (result.success) {
        info(LOG_ACTIONS.PDF_GENERATED, 'PDF generated and downloaded');
        setMessage({
          type: 'success',
          text: 'PDF generated and downloaded successfully!',
        });
        resetForm();
        setValidationErrors({});
      } else {
        logError(LOG_ACTIONS.PDF_ERROR, result.error || 'Failed to generate PDF');
        setMessage({
          type: 'error',
          text: result.error || 'Failed to generate PDF',
        });
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      logError(LOG_ACTIONS.PDF_ERROR, errorMsg);
      setMessage({
        type: 'error',
        text: `Error: ${errorMsg}`,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">MOC 106 Form</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Fill in the form fields and download your customized PDF
        </p>
      </div>

      {message && (
        <Alert
          type={message.type}
          message={message.text}
          onClose={() => setMessage(null)}
        />
      )}

      <form onSubmit={handleSubmit} className="card space-y-6 p-6">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4 dark:border-slate-700">
          <Button onClick={fillWithDefaults} variant="secondary" disabled={submitting}>
            📋 Use Defaults
          </Button>
          <Button onClick={resetForm} variant="secondary" disabled={submitting}>
            🔄 Clear Form
          </Button>
          {isSaving && <span className="text-sm text-slate-500 dark:text-slate-400">💾 Saving...</span>}
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {fields.map((field) => (
            <div key={field.name}>
              {field.type === 'checkbox' ? (
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={Boolean(values[field.name])}
                    onChange={(e) => setFieldValue(field.name, e.target.checked)}
                    className="h-5 w-5"
                    disabled={submitting}
                  />
                  <span className="text-slate-700 dark:text-slate-300">{field.label}</span>
                </label>
              ) : field.type === 'dropdown' && field.options ? (
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    {field.label}
                  </label>
                  <select
                    value={values[field.name] || ''}
                    onChange={(e) => setFieldValue(field.name, e.target.value)}
                    className="form-input w-full"
                    disabled={submitting}
                  >
                    <option value="">Select...</option>
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {validationErrors[field.name] && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                      {validationErrors[field.name]}
                    </p>
                  )}
                </div>
              ) : (
                <Input
                  label={field.label}
                  type={field.type === 'date' ? 'date' : field.type === 'email' ? 'email' : field.type === 'tel' ? 'tel' : 'text'}
                  value={values[field.name] || ''}
                  onChange={(e) => setFieldValue(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  maxLength={field.maxLength}
                  required={field.required}
                  disabled={submitting}
                  error={validationErrors[field.name]}
                />
              )}
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex gap-2 border-t border-slate-200 pt-6 dark:border-slate-700">
          <Button
            type="submit"
            variant="primary"
            loading={submitting}
            className="flex-1"
          >
            📥 Generate & Download PDF
          </Button>
        </div>
      </form>

      {/* Info */}
      <div className="card p-6">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100">Form Information</h3>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-slate-600 dark:text-slate-400">Total Fields:</dt>
            <dd className="text-slate-900 dark:text-slate-100">{fields.length}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-600 dark:text-slate-400">Required Fields:</dt>
            <dd className="text-slate-900 dark:text-slate-100">
              {fields.filter((f) => f.required).length}
            </dd>
          </div>
          {lastSaved && (
            <div className="flex justify-between">
              <dt className="text-slate-600 dark:text-slate-400">Last Saved:</dt>
              <dd className="text-slate-900 dark:text-slate-100">
                {new Date(lastSaved).toLocaleString()}
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}
