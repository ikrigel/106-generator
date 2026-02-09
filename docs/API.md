# API Documentation

## Services

### PDFService (src/services/pdfService.ts)

Handles PDF field extraction, filling, and generation.

#### extractPdfFields(pdfUrl?)
Extracts form fields from PDF file.
```typescript
const result = await pdfService.extractPdfFields('/2024.pdf');
if (result.success) {
  console.log(result.fields); // PdfField[]
}
```
Returns: `{ success, fields, error, message }`

#### fillPdfFields(formData, pdfUrl?)
Fills PDF with form data and returns Uint8Array.
```typescript
const result = await pdfService.fillPdfFields({
  fieldName: 'value',
  checkbox: true
});
if (result.success) {
  downloadPdf(result.data, 'form.pdf');
}
```
Returns: `{ success, data?, error, message }`

#### generateAndDownloadPdf(formData, options?, pdfUrl?)
Complete flow: fill PDF and download.
```typescript
await pdfService.generateAndDownloadPdf(
  { field1: 'value' },
  { filename: 'custom_name.pdf', includeTimestamp: true }
);
```
Returns: `{ success, error?, message? }`

### StorageService (src/services/storageService.ts)

High-level localStorage wrapper for all data types.

#### getTheme() / setTheme(theme)
Theme persistence.
```typescript
const theme = storageService.getTheme(); // 'light' | 'dark' | 'auto'
storageService.setTheme('dark');
```

#### getSettings() / setSettings(settings)
Settings persistence.
```typescript
const settings = storageService.getSettings();
storageService.setSettings(updatedSettings);
```

#### getFormData() / setFormData(data) / clearFormData()
Form auto-save.
```typescript
const saved = storageService.getFormData();
storageService.setFormData(formState);
storageService.clearFormData();
```

#### getLogs() / addLog(entry) / deleteLogs(ids) / clearLogs() / setLogs(logs)
Log management.
```typescript
const logs = storageService.getLogs();
storageService.addLog({
  id, timestamp, level, action, message, metadata
});
storageService.deleteLogs(['id1', 'id2']);
```

#### getPdfFields() / setPdfFields(cache)
PDF field caching.
```typescript
const cache = storageService.getPdfFields();
```

#### exportAllData()
Export everything as JSON.
```typescript
const data = storageService.exportAllData();
```

### ValidationService (src/services/validationService.ts)

Form validation logic.

#### validateFormFields(fields, values)
Validate all form fields.
```typescript
const errors = validationService.validateFormFields(fields, {
  field1: 'value',
  field2: 'value'
});
// returns { fieldName: errorMessage }
```

#### validateField(field, value)
Validate single field.
```typescript
const error = validationService.validateField(field, value);
if (error) console.log(error);
```

#### isFormValid(fields, values)
Check if form is completely valid.
```typescript
if (validationService.isFormValid(fields, values)) {
  // Safe to submit
}
```

#### areRequiredFieldsFilled(fields, values)
Check if all required fields have values.

#### getFieldByName(fields, fieldName)
Find field by name.

## Utility Functions

### Storage Utilities (src/utils/storage.ts)

```typescript
// Safe localStorage operations
getFromStorage<T>(key) → T | null
saveToStorage(key, value) → boolean
removeFromStorage(key) → boolean
clearStorage() → boolean
isStorageAvailable() → boolean
getStorageKeys() → string[]
```

### Logger Utilities (src/utils/logger.ts)

```typescript
// Console logging with formatting
formatLogMessage(level, message) → string
logDebug(message, data?) → void
logInfo(message, data?) → void
logWarn(message, data?) → void
logError(message, error?) → void
shouldLog(messageLevel, minLevel?) → boolean
generateLogId() → string
```

### Validation Utilities (src/utils/validation.ts)

```typescript
// Field validation
isValidEmail(email) → boolean
isValidPhone(phone) → boolean
isValidDate(dateString) → boolean
isValidUrl(url) → boolean
isValidLength(value, minLength?, maxLength?) → boolean
matchesPattern(value, pattern) → boolean
isRequired(value) → boolean
getValidationError(fieldName, value, validation) → string
validateForm(values, rules) → Record<string, string>
```

### Date Utilities (src/utils/dateFormatter.ts)

```typescript
// Date formatting
toISODate(date) → string              // YYYY-MM-DD
toDisplayDate(date) → string          // MMM DD, YYYY
toFullDate(date) → string             // Day, Month DD, YYYY
toDisplayDateTime(date) → string      // MMM DD, YYYY HH:mm
toISODateTime(date) → string          // ISO DateTime
parseISODate(isoString) → Date
getRelativeTime(date) → string        // "2 hours ago"
formatFilenameWithTimestamp(name, includeTime?) → string
```

### File Download Utilities (src/utils/fileDownload.ts)

```typescript
// File downloads
downloadBlob(blob, filename) → void
downloadPdf(data: Uint8Array, filename) → void
downloadJson(data, filename) → void
downloadCsv(data, filename) → void
downloadText(content, filename) → void
```

## Type Definitions

### Theme Types (src/types/theme.types.ts)
```typescript
type ThemeMode = 'light' | 'dark' | 'auto'
interface ThemeContextType {
  theme: ThemeMode
  setTheme: (theme: ThemeMode) => void
  isDark: boolean
}
```

### Settings Types (src/types/settings.types.ts)
```typescript
interface Settings {
  version: string
  user: UserSettings
  pdf: PdfSettings
  logs: LogSettings
  createdAt: string
  updatedAt: string
}
```

### Log Types (src/types/log.types.ts)
```typescript
interface LogEntry {
  id: string
  timestamp: string
  level: 'debug' | 'info' | 'warn' | 'error'
  action: string
  message: string
  metadata?: Record<string, unknown>
  userAgent?: string
}
```

### Form Types (src/types/form.types.ts)
```typescript
interface FormField {
  name: string
  type: FieldType
  label: string
  required: boolean
  placeholder?: string
  maxLength?: number
  options?: string[]
  validation?: FieldValidation
}

interface FormData {
  version: string
  fields: Record<string, string | boolean>
  lastSaved: string
  isComplete: boolean
}
```

### PDF Types (src/types/pdf.types.ts)
```typescript
interface PdfField {
  name: string
  type: PdfFieldType
  label?: string
  value?: string | boolean
  options?: string[]
}

interface PdfExtractionResult {
  success: boolean
  fields: PdfField[]
  error?: string
  message?: string
}
```

## Constants

### Storage Keys (src/constants/storage.ts)
```typescript
STORAGE_KEYS.THEME
STORAGE_KEYS.SETTINGS
STORAGE_KEYS.FORM_DATA
STORAGE_KEYS.LOGS
STORAGE_KEYS.PDF_FIELDS
STORAGE_KEYS.VERSION
```

### Routes (src/constants/routes.ts)
```typescript
ROUTES.HOME = '/'
ROUTES.FORM = '/form'
ROUTES.SETTINGS = '/settings'
ROUTES.LOGS = '/logs'
ROUTES.HELP = '/help'
ROUTES.ABOUT = '/about'
```

### Defaults (src/constants/defaults.ts)
```typescript
DEFAULT_SETTINGS       // Default configuration
DEFAULT_THEME = 'auto'
PDF_SOURCE_URL = '/2024.pdf'
FORM_AUTO_SAVE_DELAY = 1000
LOG_ACTIONS          // Action type constants
```

## Error Handling

All services use consistent error handling patterns:

```typescript
// Services return Result types
interface Result {
  success: boolean
  error?: string
  message?: string
  data?: T
}

// Utilities wrapped in try-catch
const result = getFromStorage<T>(key) // null on error
const saved = saveToStorage(key, val) // boolean on result
```

## Best Practices

1. **Always check success flag** before using service results
2. **Use hooks** instead of directly calling contexts
3. **Validate early** using validationService
4. **Log important actions** via useLogger hook
5. **Handle errors gracefully** with try-catch
6. **Debounce auto-save** to prevent excessive writes
7. **Cache expensive operations** (PDF extraction)
