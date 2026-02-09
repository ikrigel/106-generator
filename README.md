# MOC 106 Form Generator

A modern React TypeScript SPA that dynamically generates and fills MOC 106 forms based on PDF templates. Users can customize forms using their preferences, download filled PDFs, manage settings, and track actions through comprehensive logging.

## Features

- **Dynamic Form Generation**: Extracts form fields from MOC 106 PDF template and creates a responsive form UI
- **PDF Generation & Download**: Fill extracted PDF fields with user data and download customized PDFs
- **Theme Support**: Light, dark, and automatic theme modes with system preference detection
- **Settings Management**: Save user preferences locally with export/import functionality
- **Comprehensive Logging**: Track all actions with JSON export, filtering, and deletion capabilities
- **Auto-Save**: Automatically save form progress to prevent data loss
- **Help & About Pages**: In-app documentation and project information
- **Mobile Responsive**: Fully responsive design for all devices
- **TypeScript**: Type-safe development with full TypeScript support

## Tech Stack

- **Frontend**: React 19.2.0
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 4.1.18
- **Routing**: React Router v7.13.0
- **PDF Processing**: pdf-lib 1.17.1
- **Date Handling**: date-fns 4.1.0
- **Code Quality**: ESLint, Prettier, TypeScript

## Quick Start

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Type check
npm run type-check
```

## Project Structure

```
106-generator/
├── public/
│   └── 2024.pdf              # MOC 106 form template
├── src/
│   ├── components/
│   │   ├── layout/           # Header, Footer, PageLayout
│   │   ├── ui/              # Reusable UI components
│   │   └── common/          # Common utilities, ThemeSwitcher
│   ├── contexts/            # React Context providers (Theme, Settings, Logs)
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Page components (Form, Settings, Logs, Help, About)
│   ├── services/            # PDF, storage, and validation services
│   ├── utils/               # Utility functions
│   ├── types/               # TypeScript type definitions
│   ├── constants/           # Constants and default values
│   ├── App.tsx              # Root component with routing
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles
├── docs/                    # Project documentation
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
└── vercel.json
```

## Usage

### 1. Generate a Form

1. Navigate to the "Form" tab
2. The application will automatically extract fields from the MOC 106 PDF
3. Fill in the form fields with your information
4. Use "Fill Form with Defaults" to apply saved preferences

### 2. Download PDF

1. Complete the form
2. Click "Generate & Download PDF"
3. The filled PDF will download to your device

### 3. Save Settings

1. Navigate to "Settings"
2. Configure your preferences:
   - Default field values
   - Auto-save interval
   - PDF filename pattern
   - Logging preferences
3. Click "Save Settings"
4. Use "Export Settings" to backup your configuration

### 4. View Logs

1. Navigate to "Logs"
2. View all actions and events
3. Filter by level or action type
4. Export logs as JSON
5. Delete logs to free up storage

### 5. Theme Settings

1. Click the theme switcher in the header
2. Choose: Light, Dark, or Auto (follows system preference)
3. Theme preference is automatically saved

## Local Storage

The application uses localStorage for data persistence:

- `moc106_theme`: Current theme setting (light/dark/auto)
- `moc106_settings`: User preferences and configuration
- `moc106_form_data`: Auto-saved form state
- `moc106_logs`: Logged actions and events
- `moc106_pdf_fields`: Cached PDF field structure
- `moc106_version`: Application version

## Development

### Code Style

This project uses:
- **Prettier** for code formatting (100 char line width)
- **ESLint** for code quality
- **TypeScript** for type safety

### Adding New Features

1. Create TypeScript types in `src/types/`
2. Implement service layer in `src/services/`
3. Create custom hooks in `src/hooks/`
4. Build UI components in `src/components/`
5. Update documentation in `docs/`

## Deployment

### Vercel Deployment

This project is configured for automatic Vercel deployment:

1. Push code to GitHub
2. Connect repository to Vercel
3. Automatic builds on push

### Production Build

```bash
# Build for production
npm run build

# Test production build locally
npm run preview
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Help & Documentation

- **In-app Help**: Navigate to the "Help" tab for user guide and FAQs
- **About**: Navigate to "About" for project information and credits
- **Documentation**: See `docs/` folder for technical documentation

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
