# Claude.md - Project Overview for AI Assistants

## Project Summary

MOC 106 Form Generator is a React TypeScript SPA that dynamically generates and fills MOC 106 forms based on PDF templates. The application extracts form fields from a PDF, provides a responsive UI for form input, and generates downloadable filled PDFs with all user data.

**Key Characteristics:**
- Type-safe TypeScript implementation with strict mode
- localStorage-based data persistence (no server communication)
- Context API for state management
- Tailwind CSS for responsive styling
- pdf-lib for PDF manipulation
- React Router for SPA navigation

## Project Structure

```
src/
├── components/      # React components (layout, ui, common)
├── contexts/        # Context providers (Theme, Settings, Logs)
├── hooks/          # Custom React hooks (useTheme, useSettings, useLogger, etc.)
├── pages/          # Page components (FormGenerator, Settings, Logs, Help, About)
├── services/       # Business logic (PDF, Storage, Validation)
├── utils/          # Utility functions (storage, logger, validation, etc.)
├── types/          # TypeScript type definitions
├── constants/      # Constants (routes, storage keys, defaults)
├── App.tsx         # Root component with routing
├── main.tsx        # Entry point with providers
└── index.css       # Global styles and Tailwind imports
```

## Key Files & Their Purposes

### Services (Business Logic)
- **src/services/pdfService.ts** - PDF field extraction and filling using pdf-lib
- **src/services/storageService.ts** - localStorage wrapper with error handling
- **src/services/validationService.ts** - Form field validation logic

### Contexts (State Management)
- **src/contexts/ThemeContext.tsx** - Theme state (light/dark/auto) with system preference detection
- **src/contexts/SettingsContext.tsx** - User preferences and settings persistence
- **src/contexts/LogContext.tsx** - Logging system with storage rotation

### Hooks (Custom React Hooks)
- **src/hooks/useTheme.ts** - Access theme context
- **src/hooks/useSettings.ts** - Access settings context
- **src/hooks/useLogger.ts** - Access logging context
- **src/hooks/usePdfFields.ts** - Load and cache PDF fields
- **src/hooks/useFormState.ts** - Form state with auto-save debouncing

### Pages (Route Components)
- **src/pages/FormGenerator.tsx** - Main form page (dynamic field rendering)
- **src/pages/Settings.tsx** - User preferences management
- **src/pages/Logs.tsx** - Logging viewer with filtering and export
- **src/pages/Help.tsx** - User guide and FAQs
- **src/pages/About.tsx** - Project and creator information

### Components
- **src/components/ui/** - Reusable UI components (Button, Card, Input, Select, Alert)
- **src/components/common/** - Common components (ThemeSwitcher, Loading, ErrorBoundary)
- **src/components/layout/** - Layout structure (Header, Footer, PageLayout)

## Data Flow

### Form Submission Flow
1. User fills FormGenerator form
2. useFormState hook debounces and auto-saves to localStorage
3. User clicks "Generate & Download PDF"
4. FormGenerator validates form using validationService
5. pdfService.fillPdfFields() fills PDF and returns Uint8Array
6. PDF automatically downloads to user's machine
7. LogContext logs the action

### Theme Change Flow
1. User clicks ThemeSwitcher button
2. useTheme hook calls setTheme()
3. ThemeContext updates state and localStorage
4. HTML document.documentElement class updated (add/remove 'dark')
5. Tailwind CSS applies dark mode styles

### Settings Export/Import
1. User clicks "Export Settings" in Settings page
2. storageService.exportSettings() retrieves all data
3. downloadJson() creates and downloads JSON file
4. User can import by clicking "Import Settings"
5. New settings merged with existing, preserving createdAt

## localStorage Keys

All keys prefixed with `moc106_`:
- `moc106_theme` - Current theme ('light', 'dark', 'auto')
- `moc106_settings` - User preferences object
- `moc106_form_data` - Auto-saved form state
- `moc106_logs` - Array of log entries
- `moc106_pdf_fields` - Cached extracted PDF fields
- `moc106_version` - App version for migrations

## TypeScript Types

Main type files in `src/types/`:
- **theme.types.ts** - ThemeMode, ThemeContextType
- **settings.types.ts** - Settings, SettingsContextType
- **log.types.ts** - LogEntry, LogContextType
- **form.types.ts** - FormField, FormData, FormState
- **pdf.types.ts** - PdfField, PdfExtractionResult, etc.

## Common Patterns

### Adding a New Form Field Type
1. Add type to FieldType union in form.types.ts
2. Handle rendering in FormGenerator.tsx
3. Update pdfService to handle field type in fillPdfFields()
4. Add validation rules in validationService if needed

### Adding a New Settings Option
1. Add property to Settings interface in settings.types.ts
2. Add UI control in Settings.tsx page
3. Update DEFAULT_SETTINGS in constants/defaults.ts
4. Use settings in context through useSettings() hook

### Adding New Logging
1. Use useLogger() hook: `const { info, error, warn } = useLogger()`
2. Call `info(LOG_ACTION, message, metadata)`
3. Define new LOG_ACTION in constants/defaults.ts
4. Logs automatically persist and appear in Logs page

## Error Handling Strategy

- **PDF Loading Errors** - Caught in usePdfFields, displayed as Alert
- **Form Validation** - Real-time validation with field-level errors
- **Storage Errors** - Wrapped in try-catch, graceful degradation
- **Error Boundary** - Global error catcher, shows error and reload option
- **Logging** - All errors logged before user notification

## Performance Considerations

- **Code Splitting** - Pages lazy loaded via React Router
- **Debouncing** - Auto-save debounced to prevent excessive writes
- **Caching** - PDF fields cached in localStorage with version check
- **Bundle Size** - pdf-lib lazy imported where possible
- **Dark Mode** - CSS class toggle avoids re-renders

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Development Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # ESLint check
npm run type-check  # TypeScript check
npm run preview  # Preview production build
```

## Deployment

Configured for Vercel:
- **vercel.json** - Routes, caching, security headers
- Build command: `npm run build`
- Output directory: `dist`
- SPA fallback: All routes redirect to index.html

## Future Enhancement Ideas

1. **Multi-language Support** - i18n with language selector
2. **Cloud Sync** - Optional cloud backup of settings
3. **Templates** - Save and load common form configurations
4. **Batch Processing** - Generate multiple PDFs from CSV
5. **Form History** - Keep history of generated forms
6. **Advanced Validation** - Custom validation rules per field
7. **API Integration** - Optional backend for advanced features

## Debugging Tips

1. **Form fields not loading?**
   - Check PDF is in public/2024.pdf
   - Check browser console for fetch errors
   - Verify pdf-lib installed correctly

2. **Settings not persisting?**
   - Check localStorage is enabled
   - Open DevTools > Application > localStorage
   - Look for moc106_settings key

3. **Theme not changing?**
   - Check HTML element has 'dark' class in inspector
   - Verify CSS loaded (check Tailwind config)
   - Clear browser cache

4. **Auto-save not working?**
   - Check useFormState debounce delay
   - Verify settings.user.autoSave is true
   - Monitor localStorage for moc106_form_data

## Code Quality Standards

- **TypeScript** - Strict mode enabled
- **Linting** - ESLint with React hooks plugin
- **Formatting** - Prettier with 100 char line width
- **Component** - Functional components with hooks
- **State** - Context API + custom hooks (no Redux)
- **Styling** - Tailwind CSS utilities
- **Comments** - JSDoc for public functions

## Version History

- **v1.0.0** - Initial release (Feb 2026)
  - Dynamic form generation from PDF
  - PDF generation and download
  - Theme support (light/dark/auto)
  - Settings with export/import
  - Comprehensive logging system
  - Help and About pages
  - Full TypeScript support
