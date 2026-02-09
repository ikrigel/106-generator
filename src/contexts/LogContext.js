var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Log Context
 * Manages application logging and event tracking
 */
import { createContext, useState, useCallback } from 'react';
import { storageService } from '@/services/storageService';
import { useSettings } from '@/hooks/useSettings';
import { generateLogId } from '@/utils/logger';
export var LogContext = createContext(undefined);
export function LogProvider(_a) {
    var children = _a.children;
    var settings = useSettings().settings;
    var _b = useState(function () {
        return storageService.getLogs();
    }), logs = _b[0], setLogsState = _b[1];
    var addLog = useCallback(function (entry) {
        if (!settings.logs.enabled)
            return;
        var newLogs = __spreadArray(__spreadArray([], logs, true), [entry], false);
        // Rotate logs if exceeding max entries
        if (newLogs.length > settings.logs.maxEntries) {
            newLogs.splice(0, newLogs.length - settings.logs.maxEntries);
        }
        setLogsState(newLogs);
        storageService.setLogs(newLogs);
    }, [logs, settings.logs.enabled, settings.logs.maxEntries]);
    var log = useCallback(function (action, message, metadata) {
        if (settings.logs.logLevel !== 'debug')
            return;
        addLog({
            id: generateLogId(),
            timestamp: new Date().toISOString(),
            level: 'debug',
            action: action,
            message: message,
            metadata: metadata,
            userAgent: navigator.userAgent,
        });
    }, [addLog, settings.logs.logLevel]);
    var info = useCallback(function (action, message, metadata) {
        addLog({
            id: generateLogId(),
            timestamp: new Date().toISOString(),
            level: 'info',
            action: action,
            message: message,
            metadata: metadata,
            userAgent: navigator.userAgent,
        });
    }, [addLog]);
    var warn = useCallback(function (action, message, metadata) {
        if (settings.logs.logLevel !== 'debug' &&
            settings.logs.logLevel !== 'info')
            return;
        addLog({
            id: generateLogId(),
            timestamp: new Date().toISOString(),
            level: 'warn',
            action: action,
            message: message,
            metadata: metadata,
            userAgent: navigator.userAgent,
        });
    }, [addLog, settings.logs.logLevel]);
    var error = useCallback(function (action, message, metadata) {
        addLog({
            id: generateLogId(),
            timestamp: new Date().toISOString(),
            level: 'error',
            action: action,
            message: message,
            metadata: metadata,
            userAgent: navigator.userAgent,
        });
    }, [addLog]);
    var clearLogs = useCallback(function () {
        setLogsState([]);
        storageService.clearLogs();
    }, []);
    var deleteLogs = useCallback(function (ids) {
        setLogsState(function (prev) { return prev.filter(function (log) { return !ids.includes(log.id); }); });
        storageService.deleteLogs(ids);
    }, []);
    var exportLogs = useCallback(function () {
        var logsData = {
            exportedAt: new Date().toISOString(),
            count: logs.length,
            logs: logs,
        };
        var dataStr = JSON.stringify(logsData, null, 2);
        var dataBlob = new Blob([dataStr], { type: 'application/json' });
        var url = URL.createObjectURL(dataBlob);
        var link = document.createElement('a');
        link.href = url;
        link.download = "moc106_logs_".concat(new Date().toISOString().split('T')[0], ".json");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, [logs]);
    var getLogs = useCallback(function (filter) {
        if (!filter)
            return logs;
        return logs.filter(function (log) {
            for (var _i = 0, _a = Object.entries(filter); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value_1 = _b[1];
                if (log[key] !== value_1) {
                    return false;
                }
            }
            return true;
        });
    }, [logs]);
    var value = {
        logs: logs,
        log: log,
        info: info,
        warn: warn,
        error: error,
        clearLogs: clearLogs,
        deleteLogs: deleteLogs,
        exportLogs: exportLogs,
        getLogs: getLogs,
    };
    return _jsx(LogContext.Provider, { value: value, children: children });
}
