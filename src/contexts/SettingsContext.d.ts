/**
 * Settings Context
 * Manages user settings and preferences
 */
import React from 'react';
import type { SettingsContextType } from '@/types/settings.types';
export declare const SettingsContext: React.Context<SettingsContextType>;
interface SettingsProviderProps {
    children: React.ReactNode;
}
export declare function SettingsProvider({ children }: SettingsProviderProps): import("react/jsx-runtime").JSX.Element;
export {};
