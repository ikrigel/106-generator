# Component Documentation

## UI Components (src/components/ui/)

### Button
Reusable button component with variants and loading state.
```typescript
<Button variant="primary" size="md" loading={isLoading}>
  Click me
</Button>
```
Props: `variant` (primary|secondary|danger), `size` (sm|md|lg), `loading`, all HTML button props

### Card
Card container for grouped content.
```typescript
<Card className="p-6">Content here</Card>
```

### Input
Text input with label and error display.
```typescript
<Input
  label="Name"
  type="text"
  error={errors.name}
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

### Select
Dropdown select with label and error.
```typescript
<Select
  label="Choose option"
  options={[{ value: '1', label: 'Option 1' }]}
  value={selected}
  onChange={(e) => setSelected(e.target.value)}
/>
```

### Alert
Message display with success, error, warning, info types.
```typescript
<Alert
  type="success"
  message="Operation completed"
  onClose={() => setAlert(null)}
/>
```

## Common Components (src/components/common/)

### ThemeSwitcher
Three-way theme toggle (Light/Dark/Auto).
```typescript
<ThemeSwitcher />
```

### Loading
Animated loading spinner with message.
```typescript
<Loading message="Loading..." fullScreen={false} />
```

### ErrorBoundary
React error boundary for catching errors.
```typescript
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

## Layout Components (src/components/layout/)

### Header
Navigation header with theme switcher and menu.
```typescript
<Header />
```
Links to: Form, Settings, Logs, Help, About

### Footer
Footer with project info and links.
```typescript
<Footer />
```

### PageLayout
Wrapper providing header, main, and footer structure.
```typescript
<PageLayout>
  <p>Page content</p>
</PageLayout>
```

## Page Components (src/pages/)

### FormGenerator
Main form with dynamic field rendering and PDF generation.
- Extracts fields from PDF via usePdfFields
- Manages form state with useFormState
- Validates before submission
- Generates and downloads PDF

### Settings
User preferences configuration page.
- Auto-save toggle and interval
- PDF filename pattern
- Logging settings
- Export/import settings
- Reset to defaults

### Logs
Application logs viewer and manager.
- Filter by level or search term
- View detailed log entries
- Export logs as JSON
- Delete selected logs
- Clear all logs

### Help
User guide with FAQs and troubleshooting.
- Getting started instructions
- Features overview
- Frequently asked questions
- Troubleshooting guide
- Support information

### About
Project and creator information.
- Project description
- Technology stack
- Key features list
- Developer contact
- Version information

## Context Providers

### ThemeProvider
Manages application theme state.
```typescript
<ThemeProvider>
  <App />
</ThemeProvider>
```
Provides: `theme`, `setTheme()`, `isDark`

### SettingsProvider
Manages user settings and preferences.
```typescript
<SettingsProvider>
  <App />
</SettingsProvider>
```
Provides: `settings`, `updateSettings()`, `exportSettings()`, `importSettings()`

### LogProvider
Manages application logging.
```typescript
<LogProvider>
  <App />
</LogProvider>
```
Provides: `logs`, `log()`, `info()`, `warn()`, `error()`, `exportLogs()`

## Custom Hooks

### useTheme
Access theme context.
```typescript
const { theme, setTheme, isDark } = useTheme();
```

### useSettings
Access settings context.
```typescript
const { settings, updateSettings, exportSettings } = useSettings();
```

### useLogger
Access logging context.
```typescript
const { logs, info, error, clearLogs } = useLogger();
```

### usePdfFields
Load and extract PDF form fields.
```typescript
const { fields, loading, error } = usePdfFields();
```

### useFormState
Manage form state with auto-save.
```typescript
const { values, setFieldValue, resetForm, isSaving } = useFormState(fields);
```

## Component Styling

All components styled with Tailwind CSS and support dark mode via the `dark:` prefix.

Example: `className="bg-white dark:bg-slate-800"`

Global style classes defined in src/index.css:
- `.btn-primary`, `.btn-secondary`, `.btn-danger`
- `.form-input`
- `.card`

## Accessibility

Components include:
- ARIA labels where appropriate
- Keyboard navigation support
- Focus indicators
- Semantic HTML structure
- Color contrast compliance
