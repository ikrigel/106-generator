var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * Settings page
 * User preferences and configuration management
 */
import { useState, useRef } from 'react';
import { useSettings } from '@/hooks/useSettings';
export default function Settings() {
    var _this = this;
    var _a = useSettings(), settings = _a.settings, updateSettings = _a.updateSettings, resetSettings = _a.resetSettings, exportSettings = _a.exportSettings, importSettings = _a.importSettings;
    var _b = useState(null), message = _b[0], setMessage = _b[1];
    var fileInputRef = useRef(null);
    var handleAutoSaveChange = function (e) {
        updateSettings({
            user: __assign(__assign({}, settings.user), { autoSave: e.target.checked }),
        });
        setMessage({ type: 'success', text: 'Auto-save setting updated' });
    };
    var handleAutoSaveIntervalChange = function (e) {
        var interval = parseInt(e.target.value, 10) * 1000; // Convert to milliseconds
        updateSettings({
            user: __assign(__assign({}, settings.user), { autoSaveInterval: interval }),
        });
        setMessage({ type: 'success', text: 'Auto-save interval updated' });
    };
    var handlePdfFilenameChange = function (e) {
        updateSettings({
            pdf: __assign(__assign({}, settings.pdf), { downloadFilename: e.target.value }),
        });
    };
    var handleTimestampChange = function (e) {
        updateSettings({
            pdf: __assign(__assign({}, settings.pdf), { includeTimestamp: e.target.checked }),
        });
        setMessage({ type: 'success', text: 'PDF filename setting updated' });
    };
    var handleLogsEnabledChange = function (e) {
        updateSettings({
            logs: __assign(__assign({}, settings.logs), { enabled: e.target.checked }),
        });
        setMessage({ type: 'success', text: 'Logging setting updated' });
    };
    var handleMaxEntriesChange = function (e) {
        var maxEntries = parseInt(e.target.value, 10);
        updateSettings({
            logs: __assign(__assign({}, settings.logs), { maxEntries: Math.max(100, maxEntries) }),
        });
        setMessage({ type: 'success', text: 'Max log entries updated' });
    };
    var handleLogLevelChange = function (e) {
        updateSettings({
            logs: __assign(__assign({}, settings.logs), { logLevel: e.target.value }),
        });
        setMessage({ type: 'success', text: 'Log level updated' });
    };
    var handleExport = function () {
        try {
            exportSettings();
            setMessage({ type: 'success', text: 'Settings exported successfully' });
        }
        catch (error) {
            setMessage({
                type: 'error',
                text: "Failed to export settings: ".concat(error),
            });
        }
    };
    var handleImportClick = function () {
        var _a;
        (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click();
    };
    var handleImportFile = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var file, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
                    if (!file)
                        return [2 /*return*/];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, importSettings(file)];
                case 2:
                    _b.sent();
                    setMessage({ type: 'success', text: 'Settings imported successfully' });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _b.sent();
                    setMessage({
                        type: 'error',
                        text: "Failed to import settings: ".concat(error_1),
                    });
                    return [3 /*break*/, 4];
                case 4:
                    // Reset input
                    e.target.value = '';
                    return [2 /*return*/];
            }
        });
    }); };
    var handleReset = function () {
        if (window.confirm('Are you sure you want to reset all settings to defaults?')) {
            resetSettings();
            setMessage({ type: 'success', text: 'Settings reset to defaults' });
        }
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-slate-900 dark:text-slate-100", children: "Settings" }), _jsx("p", { className: "mt-2 text-slate-600 dark:text-slate-400", children: "Customize your preferences and application behavior" })] }), message && (_jsx("div", { className: "rounded-lg p-4 ".concat(message.type === 'success'
                    ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                    : 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300'), children: message.text })), _jsxs("div", { className: "card space-y-4 p-6", children: [_jsx("h2", { className: "text-xl font-semibold text-slate-900 dark:text-slate-100", children: "Form Settings" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("label", { className: "text-slate-700 dark:text-slate-300", children: "Auto-save Form Progress" }), _jsx("input", { type: "checkbox", checked: settings.user.autoSave, onChange: handleAutoSaveChange, className: "h-5 w-5" })] }), settings.user.autoSave && (_jsxs("div", { children: [_jsx("label", { className: "block text-sm text-slate-700 dark:text-slate-300", children: "Auto-save Interval (seconds)" }), _jsx("input", { type: "number", min: "5", max: "300", value: settings.user.autoSaveInterval / 1000, onChange: handleAutoSaveIntervalChange, className: "form-input mt-1 w-full" })] }))] })] }), _jsxs("div", { className: "card space-y-4 p-6", children: [_jsx("h2", { className: "text-xl font-semibold text-slate-900 dark:text-slate-100", children: "PDF Settings" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm text-slate-700 dark:text-slate-300", children: "PDF Filename Pattern" }), _jsx("input", { type: "text", value: settings.pdf.downloadFilename, onChange: handlePdfFilenameChange, placeholder: "e.g., MOC_106_{timestamp}.pdf", className: "form-input mt-1 w-full" }), _jsxs("p", { className: "mt-1 text-xs text-slate-500 dark:text-slate-400", children: ["Use ", '{timestamp}', " or ", '{date}', " for dynamic values"] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("label", { className: "text-slate-700 dark:text-slate-300", children: "Include Timestamp" }), _jsx("input", { type: "checkbox", checked: settings.pdf.includeTimestamp, onChange: handleTimestampChange, className: "h-5 w-5" })] })] })] }), _jsxs("div", { className: "card space-y-4 p-6", children: [_jsx("h2", { className: "text-xl font-semibold text-slate-900 dark:text-slate-100", children: "Logging Settings" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("label", { className: "text-slate-700 dark:text-slate-300", children: "Enable Logging" }), _jsx("input", { type: "checkbox", checked: settings.logs.enabled, onChange: handleLogsEnabledChange, className: "h-5 w-5" })] }), settings.logs.enabled && (_jsxs(_Fragment, { children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm text-slate-700 dark:text-slate-300", children: "Minimum Log Level" }), _jsxs("select", { value: settings.logs.logLevel, onChange: handleLogLevelChange, className: "form-input mt-1 w-full", children: [_jsx("option", { value: "debug", children: "Debug" }), _jsx("option", { value: "info", children: "Info" }), _jsx("option", { value: "warn", children: "Warn" }), _jsx("option", { value: "error", children: "Error" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm text-slate-700 dark:text-slate-300", children: "Max Log Entries" }), _jsx("input", { type: "number", min: "100", max: "5000", value: settings.logs.maxEntries, onChange: handleMaxEntriesChange, className: "form-input mt-1 w-full" })] })] }))] })] }), _jsxs("div", { className: "card space-y-4 p-6", children: [_jsx("h2", { className: "text-xl font-semibold text-slate-900 dark:text-slate-100", children: "Data Management" }), _jsxs("div", { className: "flex flex-wrap gap-4", children: [_jsx("button", { onClick: handleExport, className: "btn-secondary", children: "Export Settings" }), _jsx("button", { onClick: handleImportClick, className: "btn-secondary", children: "Import Settings" }), _jsx("button", { onClick: handleReset, className: "btn-danger", children: "Reset to Defaults" })] }), _jsx("input", { ref: fileInputRef, type: "file", accept: ".json", onChange: handleImportFile, className: "hidden", "aria-label": "Import settings file" })] }), _jsxs("div", { className: "card p-6", children: [_jsx("h3", { className: "font-semibold text-slate-900 dark:text-slate-100", children: "Settings Information" }), _jsxs("dl", { className: "mt-4 space-y-2 text-sm", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("dt", { className: "text-slate-600 dark:text-slate-400", children: "Created:" }), _jsx("dd", { className: "text-slate-900 dark:text-slate-100", children: new Date(settings.createdAt).toLocaleString() })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("dt", { className: "text-slate-600 dark:text-slate-400", children: "Last Updated:" }), _jsx("dd", { className: "text-slate-900 dark:text-slate-100", children: new Date(settings.updatedAt).toLocaleString() })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("dt", { className: "text-slate-600 dark:text-slate-400", children: "Version:" }), _jsx("dd", { className: "text-slate-900 dark:text-slate-100", children: settings.version })] })] })] })] }));
}
