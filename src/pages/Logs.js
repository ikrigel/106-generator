var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Logs page
 * View and manage application logs
 */
import { useState, useMemo } from 'react';
import { useLogger } from '@/hooks/useLogger';
import { getRelativeTime, toDisplayDateTime } from '@/utils/dateFormatter';
export default function Logs() {
    var _a = useLogger(), logs = _a.logs, deleteLogs = _a.deleteLogs, clearLogs = _a.clearLogs, exportLogs = _a.exportLogs;
    var _b = useState('all'), filterLevel = _b[0], setFilterLevel = _b[1];
    var _c = useState(''), searchTerm = _c[0], setSearchTerm = _c[1];
    var _d = useState([]), selectedIds = _d[0], setSelectedIds = _d[1];
    var _e = useState(null), expandedId = _e[0], setExpandedId = _e[1];
    var filteredLogs = useMemo(function () {
        return logs.filter(function (log) {
            var levelMatch = filterLevel === 'all' || log.level === filterLevel;
            var searchMatch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                log.message.toLowerCase().includes(searchTerm.toLowerCase());
            return levelMatch && searchMatch;
        });
    }, [logs, filterLevel, searchTerm]);
    var handleSelectAll = function (e) {
        if (e.target.checked) {
            setSelectedIds(filteredLogs.map(function (log) { return log.id; }));
        }
        else {
            setSelectedIds([]);
        }
    };
    var handleSelectLog = function (id) {
        setSelectedIds(function (prev) {
            return prev.includes(id) ? prev.filter(function (x) { return x !== id; }) : __spreadArray(__spreadArray([], prev, true), [id], false);
        });
    };
    var handleDelete = function () {
        if (selectedIds.length === 0)
            return;
        if (window.confirm("Delete ".concat(selectedIds.length, " log entry(ies)?"))) {
            deleteLogs(selectedIds);
            setSelectedIds([]);
        }
    };
    var handleClearAll = function () {
        if (window.confirm('Clear all logs? This cannot be undone.')) {
            clearLogs();
        }
    };
    var handleExport = function () {
        try {
            exportLogs();
        }
        catch (error) {
            console.error('Failed to export logs:', error);
        }
    };
    var getLevelColor = function (level) {
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
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-slate-900 dark:text-slate-100", children: "Logs" }), _jsx("p", { className: "mt-2 text-slate-600 dark:text-slate-400", children: "View and manage application logs and events" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center", children: [_jsx("input", { type: "text", placeholder: "Search logs...", value: searchTerm, onChange: function (e) { return setSearchTerm(e.target.value); }, className: "form-input flex-1" }), _jsxs("select", { value: filterLevel, onChange: function (e) { return setFilterLevel(e.target.value); }, className: "form-input", children: [_jsx("option", { value: "all", children: "All Levels" }), _jsx("option", { value: "debug", children: "Debug" }), _jsx("option", { value: "info", children: "Info" }), _jsx("option", { value: "warn", children: "Warn" }), _jsx("option", { value: "error", children: "Error" })] })] }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx("button", { onClick: handleExport, className: "btn-secondary", children: "Export Logs" }), selectedIds.length > 0 && (_jsxs("button", { onClick: handleDelete, className: "btn-danger", children: ["Delete (", selectedIds.length, ")"] })), logs.length > 0 && (_jsx("button", { onClick: handleClearAll, className: "btn-danger", children: "Clear All" }))] })] }), filteredLogs.length === 0 ? (_jsx("div", { className: "card p-8 text-center", children: _jsx("p", { className: "text-slate-600 dark:text-slate-400", children: logs.length === 0 ? 'No logs yet' : 'No logs match the filters' }) })) : (_jsxs("div", { className: "card divide-y divide-slate-200 dark:divide-slate-700", children: [_jsxs("div", { className: "flex items-center gap-4 p-4", children: [_jsx("input", { type: "checkbox", checked: selectedIds.length === filteredLogs.length && filteredLogs.length > 0, onChange: handleSelectAll, className: "h-5 w-5", "aria-label": "Select all logs" }), _jsxs("span", { className: "text-sm font-medium text-slate-600 dark:text-slate-400", children: [filteredLogs.length, " log", filteredLogs.length !== 1 ? 's' : ''] })] }), filteredLogs.map(function (log) { return (_jsx("div", { className: "p-4", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("input", { type: "checkbox", checked: selectedIds.includes(log.id), onChange: function () { return handleSelectLog(log.id); }, className: "mt-1 h-5 w-5" }), _jsxs("div", { className: "flex-1 cursor-pointer", onClick: function () { return setExpandedId(expandedId === log.id ? null : log.id); }, children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "inline-block rounded px-2 py-1 text-xs font-semibold ".concat(getLevelColor(log.level)), children: log.level.toUpperCase() }), _jsx("span", { className: "font-medium text-slate-900 dark:text-slate-100", children: log.action }), _jsx("span", { className: "text-sm text-slate-500 dark:text-slate-400", children: getRelativeTime(new Date(log.timestamp)) })] }), _jsx("p", { className: "mt-1 text-slate-700 dark:text-slate-300", children: log.message }), expandedId === log.id && (_jsx("div", { className: "mt-3 space-y-2 bg-slate-50 p-3 dark:bg-slate-900", children: _jsxs("div", { className: "text-xs text-slate-600 dark:text-slate-400", children: [_jsxs("p", { children: [_jsx("strong", { children: "Timestamp:" }), " ", toDisplayDateTime(new Date(log.timestamp))] }), _jsxs("p", { children: [_jsx("strong", { children: "Action:" }), " ", log.action] }), log.metadata && (_jsxs("details", { className: "mt-2", children: [_jsx("summary", { className: "cursor-pointer font-medium", children: "Metadata" }), _jsx("pre", { className: "mt-2 overflow-auto rounded bg-slate-100 p-2 dark:bg-slate-800", children: JSON.stringify(log.metadata, null, 2) })] }))] }) }))] })] }) }, log.id)); })] })), logs.length > 0 && (_jsxs("div", { className: "card p-6", children: [_jsx("h3", { className: "font-semibold text-slate-900 dark:text-slate-100", children: "Log Statistics" }), _jsxs("dl", { className: "mt-4 grid grid-cols-2 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("dt", { className: "text-slate-600 dark:text-slate-400", children: "Total Entries:" }), _jsx("dd", { className: "text-slate-900 dark:text-slate-100", children: logs.length })] }), _jsxs("div", { children: [_jsx("dt", { className: "text-slate-600 dark:text-slate-400", children: "Filtered:" }), _jsx("dd", { className: "text-slate-900 dark:text-slate-100", children: filteredLogs.length })] }), _jsxs("div", { children: [_jsx("dt", { className: "text-slate-600 dark:text-slate-400", children: "Oldest:" }), _jsx("dd", { className: "text-slate-900 dark:text-slate-100", children: logs.length > 0 ? getRelativeTime(new Date(logs[0].timestamp)) : '—' })] }), _jsxs("div", { children: [_jsx("dt", { className: "text-slate-600 dark:text-slate-400", children: "Newest:" }), _jsx("dd", { className: "text-slate-900 dark:text-slate-100", children: logs.length > 0 ? getRelativeTime(new Date(logs[logs.length - 1].timestamp)) : '—' })] })] })] }))] }));
}
