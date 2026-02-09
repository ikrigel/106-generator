export default function Help() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Help & User Guide</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Learn how to use MOC 106 Form Generator
        </p>
      </div>

      {/* Getting Started */}
      <section className="card p-6">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Getting Started</h2>
        <ol className="space-y-3 text-slate-700 dark:text-slate-300">
          <li><strong>1. Open the Form:</strong> Click on the "Form" tab to access the MOC 106 form</li>
          <li><strong>2. Fill Fields:</strong> Enter your information in each form field</li>
          <li><strong>3. Use Defaults:</strong> Click "Use Defaults" to apply saved preferences</li>
          <li><strong>4. Generate PDF:</strong> Click "Generate & Download PDF" to create your document</li>
          <li><strong>5. Download:</strong> The PDF will automatically download to your computer</li>
        </ol>
      </section>

      {/* Features */}
      <section className="card p-6">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Features</h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">🎨 Theme Support</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Switch between light, dark, and automatic themes. Auto mode follows your system preference.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">⚙️ Settings</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Save your default values, configure auto-save, customize PDF filenames, and manage logging.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">💾 Auto-Save</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Your form progress is automatically saved every 30 seconds to prevent data loss.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">📊 Logging</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Track all actions and events. Export logs as JSON for analysis or debugging.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="card p-6">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Frequently Asked Questions</h2>

        <div className="space-y-6">
          <details className="border-b border-slate-200 pb-4 dark:border-slate-700">
            <summary className="cursor-pointer font-semibold text-slate-900 dark:text-slate-100">
              How do I save my default values?
            </summary>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Go to Settings and enter your default values in the form fields. These values will be saved and can be applied to any form using the "Use Defaults" button.
            </p>
          </details>

          <details className="border-b border-slate-200 pb-4 dark:border-slate-700">
            <summary className="cursor-pointer font-semibold text-slate-900 dark:text-slate-100">
              Can I use this offline?
            </summary>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Yes! All data is stored in your browser's local storage. You can use the application offline, though the initial form template needs to be loaded once.
            </p>
          </details>

          <details className="border-b border-slate-200 pb-4 dark:border-slate-700">
            <summary className="cursor-pointer font-semibold text-slate-900 dark:text-slate-100">
              Where is my data stored?
            </summary>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              All your data (settings, form data, logs) is stored in your browser's local storage. No data is sent to any server.
            </p>
          </details>

          <details className="border-b border-slate-200 pb-4 dark:border-slate-700">
            <summary className="cursor-pointer font-semibold text-slate-900 dark:text-slate-100">
              Can I export my settings?
            </summary>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Yes! Go to Settings and click "Export Settings" to download your configuration as a JSON file. You can import it later or on another device.
            </p>
          </details>

          <details className="border-b border-slate-200 pb-4 dark:border-slate-700">
            <summary className="cursor-pointer font-semibold text-slate-900 dark:text-slate-100">
              How do I clear my data?
            </summary>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              In Settings, you can reset settings to defaults or clear individual logs. You can also clear your browser's data (cookies, cache) to start fresh.
            </p>
          </details>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="card p-6">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Troubleshooting</h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">Form fields not loading?</h3>
            <ul className="mt-2 list-inside list-disc text-slate-600 dark:text-slate-400">
              <li>Refresh the page</li>
              <li>Check your internet connection</li>
              <li>Clear your browser cache</li>
              <li>Try a different browser</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">PDF not downloading?</h3>
            <ul className="mt-2 list-inside list-disc text-slate-600 dark:text-slate-400">
              <li>Check if pop-ups are blocked</li>
              <li>Ensure you have write permissions in your downloads folder</li>
              <li>Try a different browser</li>
              <li>Check available disk space</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">Data not saving?</h3>
            <ul className="mt-2 list-inside list-disc text-slate-600 dark:text-slate-400">
              <li>Check if localStorage is enabled in your browser</li>
              <li>Ensure you haven't exceeded storage limits</li>
              <li>Try clearing browser cache and cookies</li>
              <li>Disable browser extensions that might block storage</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="card p-6 bg-blue-50 dark:bg-blue-900/20">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">Need More Help?</h2>
        <p className="text-slate-700 dark:text-slate-300 mb-4">
          If you encounter issues or have suggestions, please check the About page for contact information.
        </p>
        <a href="/about" className="text-sky-600 hover:text-sky-700 dark:text-sky-400 font-medium">
          Go to About →
        </a>
      </section>
    </div>
  );
}
