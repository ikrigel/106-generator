import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeSwitcher } from '../common/ThemeSwitcher';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { useLanguage } from '@/hooks/useLanguage';
import { ROUTES } from '@/constants/routes';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navLinks = [
    { label: t('form'), href: ROUTES.FORM },
    { label: t('settings'), href: ROUTES.SETTINGS },
    { label: t('logs'), href: ROUTES.LOGS },
    { label: t('help'), href: ROUTES.HELP },
    { label: t('about'), href: ROUTES.ABOUT },
  ];

  return (
    <header className="border-b border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
      <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to={ROUTES.HOME} className="flex items-center gap-2">
            <span className="text-2xl">📋</span>
            <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
              MOC 106 Generator
            </span>
          </Link>

          <div className="hidden gap-8 sm:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeSwitcher />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden"
              aria-label="Toggle menu"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="mt-4 space-y-2 sm:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
