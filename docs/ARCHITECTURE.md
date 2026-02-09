# Architecture Documentation

## System Overview

MOC 106 Generator is a client-side SPA with no backend requirements. All data is persisted to the browser's localStorage, ensuring complete privacy and offline functionality.

```
┌─────────────────────────────────────────────────────────────┐
│                        User Browser                         │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                   React App (main.tsx)              │    │
│  │  ┌──────────────────────────────────────────────┐  │    │
│  │  │  ErrorBoundary                                │  │    │
│  │  │  └──────────────────────────────────────────┘  │    │
│  │  │         ▲ (catches errors)                      │    │
│  │  │         │                                       │    │
│  │  │  ┌──────────────────────────────────────────┐  │    │
│  │  │  │  ThemeProvider                           │  │    │
│  │  │  │  └──────────────────────────────────────┘  │    │
│  │  │  │         ▲ (light/dark/auto)               │    │
│  │  │  │         │                                   │    │
│  │  │  │  ┌──────────────────────────────────────┐  │    │
│  │  │  │  │  SettingsProvider                    │  │    │
│  │  │  │  │  └──────────────────────────────────┘  │    │
│  │  │  │  │         ▲ (user preferences)           │    │
│  │  │  │  │         │                               │    │
│  │  │  │  │  ┌──────────────────────────────────┐  │    │
│  │  │  │  │  │  LogProvider                     │  │    │
│  │  │  │  │  │  └──────────────────────────────┘  │    │
│  │  │  │  │  │         ▲ (action logging)         │    │
│  │  │  │  │  │         │                           │    │
│  │  │  │  │  │  ┌──────────────────────────────┐  │    │
│  │  │  │  │  │  │  App (Router)                │  │    │
│  │  │  │  │  │  │  ├─ Form Page                │  │    │
│  │  │  │  │  │  │  ├─ Settings Page            │  │    │
│  │  │  │  │  │  │  ├─ Logs Page                │  │    │
│  │  │  │  │  │  │  ├─ Help Page                │  │    │
│  │  │  │  │  │  │  └─ About Page               │  │    │
│  │  │  │  │  │  └──────────────────────────────┘  │    │
│  │  │  │  │  │                                     │    │
│  │  │  │  │  └─────────────────────────────────────┘    │
│  │  │  │  └────────────────────────────────────────────┘  │
│  │  │  └──────────────────────────────────────────────────┘  │
│  │  └────────────────────────────────────────────────────────┘  │
│  └──────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  Browser APIs                                       │    │
│  │  ├─ localStorage (data persistence)               │    │
│  │  ├─ fetch() (PDF loading)                         │    │
│  │  ├─ matchMedia() (system theme detection)        │    │
│  │  └─ Blob/URL APIs (file downloads)               │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

### Form Submission Flow
```
User Input
    ↓
FormGenerator Component
    ↓
useFormState Hook (debounced save)
    ↓
storageService.setFormData() ──→ localStorage
    ↓
User clicks "Generate & Download"
    ↓
Validate Form (validationService)
    ↓
pdfService.fillPdfFields()
    ├─ Fetch 2024.pdf
    ├─ Load PDF with pdf-lib
    ├─ Fill form fields
    └─ Save to Uint8Array
    ↓
downloadPdf() (file download API)
    ↓
User's Downloads Folder
```

### Theme Management Flow
```
ThemeProvider initializes
    ↓
Check localStorage for saved theme
    ↓
If not found, use DEFAULT_THEME ('auto')
    ↓
User interacts with ThemeSwitcher
    ↓
setTheme() called
    ├─ Update state
    ├─ Save to localStorage (STORAGE_KEYS.THEME)
    └─ Update document.documentElement class
    ↓
CSS applies dark/light mode styles
    ├─ Tailwind dark: prefix selectors
    └─ CSS variables applied
```

## Dependency Graph

```
App
├── React Router
├── contexts/
│   ├── ThemeContext → useTheme hook
│   ├── SettingsContext → useSettings hook
│   └── LogContext → useLogger hook
├── services/
│   ├── pdfService (pdf-lib)
│   ├── storageService
│   └── validationService
├── hooks/
│   ├── usePdfFields → pdfService
│   └── useFormState → storageService
├── utils/
│   ├── storage → Browser localStorage
│   ├── logger → console
│   ├── validation → validation rules
│   ├── dateFormatter → date-fns
│   └── fileDownload → Blob/URL APIs
├── components/
│   ├── UI Components → Tailwind CSS
│   ├── Layout Components
│   └── Common Components
└── pages/
    ├── FormGenerator → usePdfFields, useFormState
    ├── Settings → useSettings
    ├── Logs → useLogger
    ├── Help → static content
    └── About → static content
```

## State Management Strategy

We use React Context API + Custom Hooks instead of Redux:

### ThemeContext
- **State:** current theme mode and isDark boolean
- **Updates:** user theme switcher interaction
- **Side Effects:** localStorage persistence, system preference detection

### SettingsContext
- **State:** user settings object with defaults
- **Updates:** settings form changes, export/import, reset
- **Side Effects:** localStorage persistence

### LogContext
- **State:** array of log entries
- **Updates:** log actions from anywhere in app
- **Side Effects:** localStorage persistence, log rotation

### Custom Hooks for Local State
- **usePdfFields:** PDF loading and caching
- **useFormState:** Form field values and auto-save
- **useSettings:** Access to settings context
- **useLogger:** Access to logging context
- **useTheme:** Access to theme context

## Data Persistence Architecture

```
LocalStorage Schema
└─ moc106_*
   ├─ theme: 'light' | 'dark' | 'auto'
   ├─ settings: { version, user, pdf, logs, timestamps }
   ├─ form_data: { version, fields, lastSaved, isComplete }
   ├─ logs: LogEntry[]
   ├─ pdf_fields: { version, fields[], extractedAt }
   └─ version: string (for migrations)
```

**Design Decisions:**
- Single localStorage per data type (not nested objects)
- Versioning for future schema migrations
- FIFO log rotation (oldest removed when limit exceeded)
- PDF fields cached to avoid re-extraction on every load

## Validation Architecture

Multi-layered validation approach:

```
Form Input (HTML validation)
    ↓ onChange event
useFormState sets value
    ↓ (debounced 1s)
storageService.setFormData() saves
    ↓
User clicks submit
    ↓
validationService.validateFormFields()
├─ Check required fields
├─ Check patterns
├─ Check lengths
└─ Check custom rules
    ↓
If errors, show field-level feedback
    ↓
If valid, call pdfService.generateAndDownloadPdf()
```

## PDF Processing Architecture

```
public/2024.pdf (static asset)
    ↓ fetch()
ArrayBuffer
    ↓ PDFDocument.load()
pdf-lib PDFDocument object
    ↓
For each field in formValues:
├─ Find field by name in PDF form
├─ Determine field type
├─ Set value appropriately (text/checkbox/select)
└─ Handle errors gracefully
    ↓
form.flatten() (make uneditable)
    ↓
pdfDoc.save() → Uint8Array
    ↓
new Blob([Uint8Array], { type: 'application/pdf' })
    ↓
URL.createObjectURL() → download URL
    ↓
trigger <a> element click → download
```

## Error Handling Strategy

```
Component Level
├─ FormGenerator catches validation errors
├─ Settings catches export/import errors
└─ Logs catches export errors
    ↓
Service Level
├─ pdfService returns { success, error }
├─ storageService wraps in try-catch
└─ validationService returns errors object
    ↓
Hook Level
├─ usePdfFields has error state
├─ useFormState handles save errors
└─ Custom hooks catch exceptions
    ↓
Global Level
└─ ErrorBoundary catches React errors
    └─ Shows error message + reload button
```

## Performance Optimizations

1. **Debounced Auto-Save**
   - 1 second debounce to batch form changes
   - Prevents excessive localStorage writes

2. **PDF Field Caching**
   - Cache extracted fields with version hash
   - Only re-extract if PDF changes

3. **Component Memoization**
   - Use React.memo for pure components
   - useMemo for expensive calculations

4. **Lazy Loading**
   - Pages loaded via React Router (code splitting)
   - pdf-lib loaded on demand

5. **CSS Optimization**
   - Tailwind purges unused classes
   - Dark mode uses CSS class toggle (no re-renders)

## Security Considerations

1. **No External Communication**
   - All data stays in browser
   - Only fetches 2024.pdf from public folder

2. **Input Validation**
   - All form inputs validated before PDF generation
   - File upload validated in settings import

3. **XSS Prevention**
   - React escapes values automatically
   - No dangerouslySetInnerHTML used

4. **localStorage Limitations**
   - Accessible only from same origin
   - Cleared with browser cache if user chooses
   - Not suitable for sensitive data (passwords)

## Future Architecture Considerations

1. **Service Worker for Offline**
   - Cache PDF and assets
   - Work completely offline

2. **IndexedDB for Large Logs**
   - Replace localStorage for better capacity
   - Better for structured data

3. **Web Workers for PDF**
   - Offload PDF processing
   - Keep UI responsive

4. **Optional Backend**
   - Cloud storage of settings
   - Form history/templates
   - Analytics (with privacy options)
