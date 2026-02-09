/**
 * Theme type definitions
 * Defines the theme options and related types
 */

export type ThemeMode = 'light' | 'dark' | 'auto';

export interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  isDark: boolean;
}
