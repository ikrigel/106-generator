/**
 * Theme Context
 * Manages application theme (light/dark/auto) state
 */
import React from 'react';
import type { ThemeContextType } from '@/types/theme.types';
export declare const ThemeContext: React.Context<ThemeContextType>;
interface ThemeProviderProps {
    children: React.ReactNode;
}
export declare function ThemeProvider({ children }: ThemeProviderProps): import("react/jsx-runtime").JSX.Element;
export {};
