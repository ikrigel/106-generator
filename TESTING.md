# MOC 106 Form Generator - Testing Guide

## Running Playwright Tests

### Prerequisites
- Node.js v18+ installed
- Application dependencies installed: `npm install`
- Playwright browsers installed: `npx playwright install`

### Running Tests

#### Run all tests (headless)
```bash
npm test
```

#### Run tests in UI mode (interactive)
```bash
npm test:ui
```

#### Run tests in debug mode
```bash
npm test:debug
```

#### Run tests with browser visible
```bash
npm test:headed
```

#### Run specific test file
```bash
npx playwright test tests/form.spec.ts
```

#### Run tests matching pattern
```bash
npx playwright test --grep "should load"
```

### Test Report
After running tests, view the HTML report:
```bash
npx playwright show-report
```

## Test Coverage

### Form Tests (`tests/form.spec.ts`)
- **Load form page**: Verify page loads with form heading
- **Form action buttons**: Check for Use Defaults, Clear Form, Download buttons
- **Display form fields**: Verify all expected form fields are displayed
- **Fill with defaults**: Click "Use Defaults" and verify form populates
- **Clear form**: Click "Clear Form" and verify all fields are cleared
- **Form information**: Check that form stats are displayed
- **Persist to localStorage**: Verify auto-save saves to browser storage
- **Load on reload**: Reload page and verify saved data is restored
- **Validate required fields**: Try submitting empty form and check validation error
- **Auto-save indicator**: Verify "Saving..." indicator appears during save

### PDF Tests (`tests/pdf.spec.ts`)
- **Generate and download PDF**: Fill form and download PDF file
- **Success message**: Verify success notification after generation
- **Default values in PDF**: Use defaults and generate PDF
- **Button disabled during generation**: Check submit button disabled state
- **Timestamp in filename**: Verify generated filename includes timestamp
- **Different input types**: Test text, email, date inputs in single generation
- **Multiple field types**: Verify form accepts various input types

### Settings Tests (`tests/settings.spec.ts`)
- **Load settings page**: Verify settings page loads
- **Form settings section**: Check auto-save toggle is present
- **Toggle auto-save**: Turn auto-save on/off
- **Change auto-save interval**: Adjust save interval in seconds
- **Update PDF filename pattern**: Change PDF download filename
- **Toggle timestamp inclusion**: Include/exclude timestamp in filename
- **Logging settings**: Check logging controls
- **Data management buttons**: Verify export, import, reset, clear buttons
- **Clear form data**: Click clear button with confirmation
- **Cancel clear data**: Dismiss confirmation dialog
- **Settings information**: Verify created/updated dates and version shown

### Theme Tests (`tests/theme.spec.ts`)
- **Load with default theme**: Page loads with theme applied
- **Theme switcher in header**: Theme switcher buttons are visible
- **Switch to light theme**: Click light theme button (☀️)
- **Switch to dark theme**: Click dark theme button (🌙)
- **Switch to auto theme**: Click auto theme button (🔄)
- **Persist theme to localStorage**: Verify theme selection saved
- **Apply theme on reload**: Reload page and verify theme persists
- **Apply theme classes to body**: Verify CSS classes applied correctly
- **Show active theme button state**: Verify active theme button styling

### Navigation Tests (`tests/navigation.spec.ts`)
- **Load home page**: Navigate to root URL
- **Navigate to form page**: Click form link or navigate directly
- **Navigate to settings page**: Click settings link
- **Navigate to logs page**: Click logs link
- **Navigate to help page**: Click help link
- **Navigate to about page**: Click about link
- **Have navigation in header**: Verify header has navigation links
- **Footer information**: Verify footer displays content
- **Navigation accessibility**: Test keyboard navigation
- **Mobile responsive**: Set mobile viewport and test navigation
- **Handle 404 routes**: Navigate to non-existent page gracefully

## Manual Testing Checklist

### Form Page (Manual)
- [ ] Page loads with all form fields visible
- [ ] "Use Defaults" button populates form with default values
- [ ] "Clear Form" button clears all fields
- [ ] Typing in fields shows "Saving..." indicator
- [ ] Form data persists after page reload
- [ ] Can submit form and generate PDF
- [ ] PDF contains all filled data
- [ ] Required field validation works

### Settings Page (Manual)
- [ ] All setting sections are visible
- [ ] Auto-save toggle works
- [ ] Auto-save interval can be changed
- [ ] PDF filename pattern can be customized
- [ ] Timestamp toggle works
- [ ] "Export Settings" downloads JSON file
- [ ] "Import Settings" loads JSON file
- [ ] "Clear Form Data" removes saved form
- [ ] "Reset Settings" restores defaults
- [ ] Settings persist after page reload

### Theme Switching (Manual)
- [ ] Light theme (☀️) applies light styling
- [ ] Dark theme (🌙) applies dark styling
- [ ] Auto theme (🔄) adapts to system preference
- [ ] Theme persists after page reload
- [ ] All pages respect theme setting
- [ ] Form inputs styled correctly in both themes
- [ ] Text readable in both themes

### Form Data Persistence (Manual)
- [ ] On first load, form has default values
- [ ] Changes auto-save (watch for "Saving..." indicator)
- [ ] Saved data loads after page reload
- [ ] "Clear Form" removes saved data
- [ ] "Use Defaults" overwrites saved data with defaults
- [ ] localStorage visible in browser DevTools > Application > Local Storage

### PDF Generation (Manual)
- [ ] Generated PDF downloads with correct filename
- [ ] PDF contains all form data that was filled
- [ ] Timestamp is included in filename (if enabled)
- [ ] Multiple PDFs can be generated with different data
- [ ] PDF looks professional and readable

## Testing Scenarios

### Scenario 1: First Time User
1. Load application for first time
2. Verify form is pre-populated with default MOC 106 data
3. Modify a few fields
4. Reload page
5. Verify changes are restored
6. Click "Download PDF"
7. Verify PDF downloads and contains your data

### Scenario 2: Data Management
1. Go to Settings
2. Fill some form data (navigate to form and make changes)
3. Return to Settings
4. Click "Clear Form Data"
5. Confirm the action
6. Navigate back to form
7. Verify form is empty (only defaults shown after refresh)

### Scenario 3: Export and Import Settings
1. Go to Settings
2. Modify a setting (e.g., auto-save interval)
3. Click "Export Settings"
4. Save the JSON file
5. Modify another setting differently
6. Click "Import Settings"
7. Select the saved JSON file
8. Verify original settings are restored

### Scenario 4: Theme Persistence
1. Switch to dark theme
2. Navigate to different pages
3. Reload the page
4. Verify theme is still dark
5. Switch to light theme
6. Navigate and reload again
7. Verify light theme persists

### Scenario 5: Form Auto-Save
1. Open DevTools (F12) → Application → Local Storage
2. Fill the first form field
3. Watch the value appear in localStorage under 'moc106_form_data'
4. Fill more fields
5. Watch values update in localStorage
6. Close DevTools
7. Reload the page
8. Verify all fields are restored

## Expected Application Behavior

### Form Loading
- First load: Form displays with default values (פולו ❤️ מרקו name and other MOC data)
- After modification: Saved data loads instead of defaults
- Auto-save: Every 1 second of inactivity, data saves to localStorage

### PDF Generation
- PDF includes all non-empty form fields
- PDF has organized sections:
  - Personal Information
  - Income Information
  - Deductions
  - Tax Calculation
  - Additional Information
- Hebrew names are converted to Latin: פולו → pvlv, ❤ → <3
- Filename includes timestamp unless disabled

### Theme
- Light theme: White background, dark text (default)
- Dark theme: Dark background (slate-950), light text
- Auto theme: Follows system preference

### Settings
- All settings persist to localStorage
- Settings apply immediately
- Export produces valid JSON file
- Import validates and loads JSON file

## Troubleshooting

### Tests fail to run
```bash
# Install browsers
npx playwright install

# Clear test artifacts
rm -rf test-results
rm -rf playwright-report

# Reinstall dependencies
rm -rf node_modules
npm install
```

### Port already in use
```bash
# Find process using port 5173
lsof -i :5173

# Kill the process
kill -9 <PID>
```

### LocalStorage issues
- Open DevTools → Application → Local Storage → Clear All
- Reload the application
- Verify fresh state

### PDF generation fails
- Check browser console for errors (F12)
- Verify form has required fields filled
- Check PDF filename doesn't contain invalid characters

## CI/CD Integration

For continuous integration, use:
```bash
# Run all tests in headless mode
npm test

# Generate report
npx playwright show-report
```

The test suite is designed to run in headless mode for CI/CD pipelines.
