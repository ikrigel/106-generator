import React from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">
              MOC 106 Generator
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Dynamic PDF form filling application
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-100">Features</h4>
            <ul className="mt-2 space-y-1 text-sm text-slate-600 dark:text-slate-400">
              <li>Dynamic Forms</li>
              <li>PDF Generation</li>
              <li>Theme Support</li>
              <li>Auto-save</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-100">Help</h4>
            <ul className="mt-2 space-y-1 text-sm">
              <li>
                <a href="/help" className="text-sky-600 hover:text-sky-700 dark:text-sky-400">
                  User Guide
                </a>
              </li>
              <li>
                <a href="/about" className="text-sky-600 hover:text-sky-700 dark:text-sky-400">
                  About
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 dark:text-slate-100">Version</h4>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">v1.0.0</p>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-8 dark:border-slate-700">
          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            &copy; {currentYear} MOC 106 Form Generator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
