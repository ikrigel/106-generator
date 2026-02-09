/**
 * Settings Context
 * Manages user settings and preferences
 */

import React, { createContext, useState, useCallback, useEffect } from 'react';
import { storageService } from '@/services/storageService';
import type { Settings, SettingsContextType } from '@/types/settings.types';
import { DEFAULT_SETTINGS } from '@/constants/defaults';
import { downloadJson } from '@/utils/fileDownload';

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

interface SettingsProviderProps {
  children: React.ReactNode;
}

export function SettingsProvider({ children }: SettingsProviderProps) {
  const [settings, setSettingsState] = useState<Settings>(() => {
    return storageService.getSettings();
  });

  const updateSettings = useCallback((updates: Partial<Settings>) => {
    setSettingsState((prev) => {
      const newSettings = {
        ...prev,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      storageService.setSettings(newSettings);
      return newSettings;
    });
  }, []);

  const resetSettings = useCallback(() => {
    const resetSettings = {
      ...DEFAULT_SETTINGS,
      createdAt: settings.createdAt,
      updatedAt: new Date().toISOString(),
    };
    setSettingsState(resetSettings);
    storageService.setSettings(resetSettings);
  }, [settings.createdAt]);

  const exportSettings = useCallback(() => {
    const filename = `moc106_settings_${new Date().toISOString().split('T')[0]}.json`;
    downloadJson(settings, filename);
  }, [settings]);

  const importSettings = useCallback(async (file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const content = event.target?.result as string;
          const imported = JSON.parse(content) as Settings;

          // Validate imported settings
          if (!imported.version || !imported.user || !imported.pdf || !imported.logs) {
            throw new Error('Invalid settings file format');
          }

          // Merge with existing settings (preserve createdAt)
          const merged: Settings = {
            ...imported,
            createdAt: settings.createdAt,
            updatedAt: new Date().toISOString(),
          };

          setSettingsState(merged);
          storageService.setSettings(merged);
          resolve();
        } catch (error) {
          reject(new Error(`Failed to import settings: ${error}`));
        }
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      reader.readAsText(file);
    });
  }, [settings.createdAt]);

  const value: SettingsContextType = {
    settings,
    updateSettings,
    resetSettings,
    exportSettings,
    importSettings,
  };

  return (
    <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
  );
}
