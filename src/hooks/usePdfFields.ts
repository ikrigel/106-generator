import { useState, useEffect } from 'react';
import { pdfService } from '@/services/pdfService';
import type { PdfField } from '@/types/pdf.types';

export function usePdfFields() {
  const [fields, setFields] = useState<PdfField[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const extractFields = async () => {
      setLoading(true);
      const result = await pdfService.extractPdfFields();
      if (result.success) {
        setFields(result.fields);
        setError(null);
      } else {
        setError(result.error || 'Failed to extract PDF fields');
      }
      setLoading(false);
    };

    extractFields();
  }, []);

  return { fields, loading, error };
}
