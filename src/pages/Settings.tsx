/**
 * Settings page
 * User preferences and configuration management
 */

import React, { useState, useRef } from 'react';
import { useSettings } from '@/hooks/useSettings';
import { storageService } from '@/services/storageService';

export default function Settings() {
  const { settings, updateSettings, resetSettings, exportSettings, importSettings } = useSettings();
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAutoSaveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({
      user: {
        ...settings.user,
        autoSave: e.target.checked,
      },
    });
    setMessage({ type: 'success', text: 'Auto-save setting updated' });
  };

  const handleAutoSaveIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const interval = parseInt(e.target.value, 10) * 1000; // Convert to milliseconds
    updateSettings({
      user: {
        ...settings.user,
        autoSaveInterval: interval,
      },
    });
    setMessage({ type: 'success', text: 'Auto-save interval updated' });
  };

  const handlePdfFilenameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({
      pdf: {
        ...settings.pdf,
        downloadFilename: e.target.value,
      },
    });
  };

  const handleTimestampChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({
      pdf: {
        ...settings.pdf,
        includeTimestamp: e.target.checked,
      },
    });
    setMessage({ type: 'success', text: 'PDF filename setting updated' });
  };

  const handleLogsEnabledChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({
      logs: {
        ...settings.logs,
        enabled: e.target.checked,
      },
    });
    setMessage({ type: 'success', text: 'Logging setting updated' });
  };

  const handleMaxEntriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxEntries = parseInt(e.target.value, 10);
    updateSettings({
      logs: {
        ...settings.logs,
        maxEntries: Math.max(100, maxEntries),
      },
    });
    setMessage({ type: 'success', text: 'Max log entries updated' });
  };

  const handleLogLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSettings({
      logs: {
        ...settings.logs,
        logLevel: e.target.value as 'debug' | 'info' | 'warn' | 'error',
      },
    });
    setMessage({ type: 'success', text: 'Log level updated' });
  };

  const handleExport = () => {
    try {
      exportSettings();
      setMessage({ type: 'success', text: 'Settings exported successfully' });
    } catch (error) {
      setMessage({
        type: 'error',
        text: `Failed to export settings: ${error}`,
      });
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await importSettings(file);
      setMessage({ type: 'success', text: 'Settings imported successfully' });
    } catch (error) {
      setMessage({
        type: 'error',
        text: `Failed to import settings: ${error}`,
      });
    }

    // Reset input
    e.target.value = '';
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to defaults?')) {
      resetSettings();
      setMessage({ type: 'success', text: 'Settings reset to defaults' });
    }
  };

  const handleClearFormData = () => {
    if (window.confirm('Are you sure you want to clear all saved form data? This cannot be undone.')) {
      storageService.clearFormData();
      setMessage({ type: 'success', text: 'Form data cleared successfully' });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Settings</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Customize your preferences and application behavior
        </p>
      </div>

      {message && (
        <div
          className={`rounded-lg p-4 ${
            message.type === 'success'
              ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300'
              : 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Form Settings */}
      <div className="card space-y-4 p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Form Settings</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-slate-700 dark:text-slate-300">Auto-save Form Progress</label>
            <input
              type="checkbox"
              checked={settings.user.autoSave}
              onChange={handleAutoSaveChange}
              className="h-5 w-5"
            />
          </div>

          {settings.user.autoSave && (
            <div>
              <label className="block text-sm text-slate-700 dark:text-slate-300">
                Auto-save Interval (seconds)
              </label>
              <input
                type="number"
                min="5"
                max="300"
                value={settings.user.autoSaveInterval / 1000}
                onChange={handleAutoSaveIntervalChange}
                className="form-input mt-1 w-full"
              />
            </div>
          )}
        </div>
      </div>

      {/* PDF Settings */}
      <div className="card space-y-4 p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">PDF Settings</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-700 dark:text-slate-300">
              PDF Filename Pattern
            </label>
            <input
              type="text"
              value={settings.pdf.downloadFilename}
              onChange={handlePdfFilenameChange}
              placeholder="e.g., MOC_106_{timestamp}.pdf"
              className="form-input mt-1 w-full"
            />
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Use {'{timestamp}'} or {'{date}'} for dynamic values
            </p>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-slate-700 dark:text-slate-300">Include Timestamp</label>
            <input
              type="checkbox"
              checked={settings.pdf.includeTimestamp}
              onChange={handleTimestampChange}
              className="h-5 w-5"
            />
          </div>
        </div>
      </div>

      {/* Logging Settings */}
      <div className="card space-y-4 p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Logging Settings
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-slate-700 dark:text-slate-300">Enable Logging</label>
            <input
              type="checkbox"
              checked={settings.logs.enabled}
              onChange={handleLogsEnabledChange}
              className="h-5 w-5"
            />
          </div>

          {settings.logs.enabled && (
            <>
              <div>
                <label className="block text-sm text-slate-700 dark:text-slate-300">
                  Minimum Log Level
                </label>
                <select
                  value={settings.logs.logLevel}
                  onChange={handleLogLevelChange}
                  className="form-input mt-1 w-full"
                >
                  <option value="debug">Debug</option>
                  <option value="info">Info</option>
                  <option value="warn">Warn</option>
                  <option value="error">Error</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-700 dark:text-slate-300">
                  Max Log Entries
                </label>
                <input
                  type="number"
                  min="100"
                  max="5000"
                  value={settings.logs.maxEntries}
                  onChange={handleMaxEntriesChange}
                  className="form-input mt-1 w-full"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Data Management */}
      <div className="card space-y-4 p-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Data Management
        </h2>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleExport}
            className="btn-secondary"
          >
            Export Settings
          </button>

          <button
            onClick={handleImportClick}
            className="btn-secondary"
          >
            Import Settings
          </button>

          <button
            onClick={handleReset}
            className="btn-danger"
          >
            Reset Settings
          </button>

          <button
            onClick={handleClearFormData}
            className="btn-danger"
          >
            Clear Form Data
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImportFile}
          className="hidden"
          aria-label="Import settings file"
        />
      </div>

      {/* Info */}
      <div className="card p-6">
        <h3 className="font-semibold text-slate-900 dark:text-slate-100">Settings Information</h3>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-slate-600 dark:text-slate-400">Created:</dt>
            <dd className="text-slate-900 dark:text-slate-100">
              {new Date(settings.createdAt).toLocaleString()}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-600 dark:text-slate-400">Last Updated:</dt>
            <dd className="text-slate-900 dark:text-slate-100">
              {new Date(settings.updatedAt).toLocaleString()}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-slate-600 dark:text-slate-400">Version:</dt>
            <dd className="text-slate-900 dark:text-slate-100">{settings.version}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
