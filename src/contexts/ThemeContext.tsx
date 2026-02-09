/**
 * Theme Context
 * Manages application theme (light/dark/auto) state
 */

import React, { createContext, useEffect, useState, useCallback } from 'react';
import { storageService } from '@/services/storageService';
import type { ThemeMode, ThemeContextType } from '@/types/theme.types';
import { DEFAULT_THEME } from '@/constants/defaults';

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    return storageService.getTheme() || DEFAULT_THEME;
  });

  const [isDark, setIsDark] = useState(false);

  // Handle system theme change
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      if (theme === 'auto') {
        setIsDark(mediaQuery.matches);
      }
    };

    // Set initial state
    if (theme === 'auto') {
      setIsDark(mediaQuery.matches);
    } else {
      setIsDark(theme === 'dark');
    }

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Update DOM and localStorage when theme changes
  useEffect(() => {
    const htmlElement = document.documentElement;

    if (isDark) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }
  }, [isDark]);

  const setTheme = useCallback((newTheme: ThemeMode) => {
    setThemeState(newTheme);
    storageService.setTheme(newTheme);

    // Update isDark based on new theme
    if (newTheme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setIsDark(mediaQuery.matches);
    } else {
      setIsDark(newTheme === 'dark');
    }
  }, []);

  const value: ThemeContextType = {
    theme,
    setTheme,
    isDark,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
