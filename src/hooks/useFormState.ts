import { useState, useCallback, useEffect } from 'react';
import { storageService } from '@/services/storageService';
import { useSettings } from './useSettings';
import { FORM_AUTO_SAVE_DELAY } from '@/constants/defaults';

export function useFormState(fields: { name: string }[]) {
  const { settings } = useSettings();
  const [values, setValues] = useState<Record<string, string | boolean>>(() => {
    const savedData = storageService.getFormData();
    if (savedData) {
      return savedData.fields;
    }
    return Object.fromEntries(fields.map((f) => [f.name, '']));
  });

  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  // Auto-save effect
  useEffect(() => {
    if (!settings.user.autoSave) return;

    const timeout = setTimeout(() => {
      const formData = {
        version: '1.0.0',
        fields: values,
        lastSaved: new Date().toISOString(),
        isComplete: false,
      };

      setIsSaving(true);
      storageService.setFormData(formData);
      setLastSaved(formData.lastSaved);
      setIsSaving(false);
    }, FORM_AUTO_SAVE_DELAY);

    return () => clearTimeout(timeout);
  }, [values, settings.user.autoSave]);

  const setFieldValue = useCallback((name: string, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const resetForm = useCallback(() => {
    const initial = Object.fromEntries(fields.map((f) => [f.name, '']));
    setValues(initial);
    storageService.clearFormData();
    setLastSaved(null);
  }, [fields]);

  const fillWithDefaults = useCallback(() => {
    const withDefaults = Object.fromEntries(
      fields.map((f) => [
        f.name,
        settings.user.defaultValues[f.name] || '',
      ]),
    );
    setValues(withDefaults);
  }, [fields, settings.user.defaultValues]);

  return {
    values,
    setFieldValue,
    resetForm,
    fillWithDefaults,
    isSaving,
    lastSaved,
  };
}
