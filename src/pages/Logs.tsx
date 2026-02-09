/**
 * Logs page
 * View and manage application logs
 */

import React, { useState, useMemo } from 'react';
import { useLogger } from '@/hooks/useLogger';
import { getRelativeTime, toDisplayDateTime } from '@/utils/dateFormatter';
import type { LogLevel } from '@/types/log.types';

export default function Logs() {
  const { logs, deleteLogs, clearLogs, exportLogs } = useLogger();
  const [filterLevel, setFilterLevel] = useState<LogLevel | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const levelMatch = filterLevel === 'all' || log.level === filterLevel;
      const searchMatch =
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.message.toLowerCase().includes(searchTerm.toLowerCase());
      return levelMatch && searchMatch;
    });
  }, [logs, filterLevel, searchTerm]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredLogs.map((log) => log.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectLog = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleDelete = () => {
    if (selectedIds.length === 0) return;
    if (window.confirm(`Delete ${selectedIds.length} log entry(ies)?`)) {
      deleteLogs(selectedIds);
      setSelectedIds([]);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all logs? This cannot be undone.')) {
      clearLogs();
    }
  };

  const handleExport = () => {
    try {
      exportLogs();
    } catch (error) {
      console.error('Failed to export logs:', error);
    }
  };

  const getLevelColor = (level: LogLevel) => {
    switch (level) {
      case 'debug':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      case 'info':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-300';
      case 'warn':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-300';
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-300';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Logs</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          View and manage application logs and events
        </p>
      </div>

      {/* Toolbar */}
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <input
            type="text"
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input flex-1"
          />

          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value as LogLevel | 'all')}
            className="form-input"
          >
            <option value="all">All Levels</option>
            <option value="debug">Debug</option>
            <option value="info">Info</option>
            <option value="warn">Warn</option>
            <option value="error">Error</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-2">
          <button onClick={handleExport} className="btn-secondary">
            Export Logs
          </button>

          {selectedIds.length > 0 && (
            <button onClick={handleDelete} className="btn-danger">
              Delete ({selectedIds.length})
            </button>
          )}

          {logs.length > 0 && (
            <button onClick={handleClearAll} className="btn-danger">
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Logs List */}
      {filteredLogs.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-slate-600 dark:text-slate-400">
            {logs.length === 0 ? 'No logs yet' : 'No logs match the filters'}
          </p>
        </div>
      ) : (
        <div className="card divide-y divide-slate-200 dark:divide-slate-700">
          {/* Header with select all */}
          <div className="flex items-center gap-4 p-4">
            <input
              type="checkbox"
              checked={selectedIds.length === filteredLogs.length && filteredLogs.length > 0}
              onChange={handleSelectAll}
              className="h-5 w-5"
              aria-label="Select all logs"
            />
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {filteredLogs.length} log{filteredLogs.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Logs */}
          {filteredLogs.map((log) => (
            <div key={log.id} className="p-4">
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(log.id)}
                  onChange={() => handleSelectLog(log.id)}
                  className="mt-1 h-5 w-5"
                />

                <div className="flex-1 cursor-pointer" onClick={() => setExpandedId(expandedId === log.id ? null : log.id)}>
                  <div className="flex items-center gap-3">
                    <span className={`inline-block rounded px-2 py-1 text-xs font-semibold ${getLevelColor(log.level)}`}>
                      {log.level.toUpperCase()}
                    </span>
                    <span className="font-medium text-slate-900 dark:text-slate-100">
                      {log.action}
                    </span>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {getRelativeTime(new Date(log.timestamp))}
                    </span>
                  </div>

                  <p className="mt-1 text-slate-700 dark:text-slate-300">{log.message}</p>

                  {expandedId === log.id && (
                    <div className="mt-3 space-y-2 bg-slate-50 p-3 dark:bg-slate-900">
                      <div className="text-xs text-slate-600 dark:text-slate-400">
                        <p>
                          <strong>Timestamp:</strong> {toDisplayDateTime(new Date(log.timestamp))}
                        </p>
                        <p>
                          <strong>Action:</strong> {log.action}
                        </p>
                        {log.metadata && (
                          <details className="mt-2">
                            <summary className="cursor-pointer font-medium">
                              Metadata
                            </summary>
                            <pre className="mt-2 overflow-auto rounded bg-slate-100 p-2 dark:bg-slate-800">
                              {JSON.stringify(log.metadata, null, 2)}
                            </pre>
                          </details>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info */}
      {logs.length > 0 && (
        <div className="card p-6">
          <h3 className="font-semibold text-slate-900 dark:text-slate-100">
            Log Statistics
          </h3>
          <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-slate-600 dark:text-slate-400">Total Entries:</dt>
              <dd className="text-slate-900 dark:text-slate-100">{logs.length}</dd>
            </div>
            <div>
              <dt className="text-slate-600 dark:text-slate-400">Filtered:</dt>
              <dd className="text-slate-900 dark:text-slate-100">{filteredLogs.length}</dd>
            </div>
            <div>
              <dt className="text-slate-600 dark:text-slate-400">Oldest:</dt>
              <dd className="text-slate-900 dark:text-slate-100">
                {logs.length > 0 ? getRelativeTime(new Date(logs[0].timestamp)) : '—'}
              </dd>
            </div>
            <div>
              <dt className="text-slate-600 dark:text-slate-400">Newest:</dt>
              <dd className="text-slate-900 dark:text-slate-100">
                {logs.length > 0 ? getRelativeTime(new Date(logs[logs.length - 1].timestamp)) : '—'}
              </dd>
            </div>
          </dl>
        </div>
      )}
    </div>
  );
}
