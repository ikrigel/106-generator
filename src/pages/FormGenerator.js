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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { usePdfFields } from '@/hooks/usePdfFields';
import { useFormState } from '@/hooks/useFormState';
import { useLogger } from '@/hooks/useLogger';
import { useSettings } from '@/hooks/useSettings';
import { pdfService } from '@/services/pdfService';
import { validationService } from '@/services/validationService';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { Loading } from '@/components/common/Loading';
import { LOG_ACTIONS } from '@/constants/defaults';
export default function FormGenerator() {
    var _this = this;
    var _a = usePdfFields(), fields = _a.fields, loading = _a.loading, pdfError = _a.error;
    var _b = useFormState(fields), values = _b.values, setFieldValue = _b.setFieldValue, resetForm = _b.resetForm, fillWithDefaults = _b.fillWithDefaults, isSaving = _b.isSaving;
    var _c = useLogger(), info = _c.info, logError = _c.error;
    var settings = useSettings().settings;
    var _d = useState(false), submitting = _d[0], setSubmitting = _d[1];
    var _e = useState(null), message = _e[0], setMessage = _e[1];
    var _f = useState({}), validationErrors = _f[0], setValidationErrors = _f[1];
    if (loading) {
        return _jsx(Loading, { message: "Loading form fields..." });
    }
    if (pdfError || fields.length === 0) {
        return (_jsxs("div", { className: "space-y-4", children: [_jsx("h1", { className: "text-3xl font-bold text-slate-900 dark:text-slate-100", children: "MOC 106 Form" }), _jsx(Alert, { type: "error", title: "Error", message: pdfError || 'No form fields found in PDF' })] }));
    }
    var handleSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var errors, filename, result, err_1, errorMsg;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    errors = validationService.validateFormFields(fields, values);
                    if (Object.keys(errors).length > 0) {
                        setValidationErrors(errors);
                        setMessage({
                            type: 'error',
                            text: "Please correct ".concat(Object.keys(errors).length, " field(s)"),
                        });
                        return [2 /*return*/];
                    }
                    setSubmitting(true);
                    setMessage(null);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    info(LOG_ACTIONS.FORM_SUBMITTED, 'Form submitted for PDF generation');
                    filename = settings.pdf.downloadFilename;
                    return [4 /*yield*/, pdfService.generateAndDownloadPdf(values, {
                            filename: filename,
                            includeTimestamp: settings.pdf.includeTimestamp,
                        })];
                case 2:
                    result = _a.sent();
                    if (result.success) {
                        info(LOG_ACTIONS.PDF_GENERATED, 'PDF generated and downloaded');
                        setMessage({
                            type: 'success',
                            text: 'PDF generated and downloaded successfully!',
                        });
                        resetForm();
                        setValidationErrors({});
                    }
                    else {
                        logError(LOG_ACTIONS.PDF_ERROR, result.error || 'Failed to generate PDF');
                        setMessage({
                            type: 'error',
                            text: result.error || 'Failed to generate PDF',
                        });
                    }
                    return [3 /*break*/, 5];
                case 3:
                    err_1 = _a.sent();
                    errorMsg = err_1 instanceof Error ? err_1.message : 'Unknown error';
                    logError(LOG_ACTIONS.PDF_ERROR, errorMsg);
                    setMessage({
                        type: 'error',
                        text: "Error: ".concat(errorMsg),
                    });
                    return [3 /*break*/, 5];
                case 4:
                    setSubmitting(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-slate-900 dark:text-slate-100", children: "MOC 106 Form" }), _jsx("p", { className: "mt-2 text-slate-600 dark:text-slate-400", children: "Fill in the form fields and download your customized PDF" })] }), message && (_jsx(Alert, { type: message.type, message: message.text, onClose: function () { return setMessage(null); } })), _jsxs("form", { onSubmit: handleSubmit, className: "card space-y-6 p-6", children: [_jsxs("div", { className: "flex flex-wrap gap-2 border-b border-slate-200 pb-4 dark:border-slate-700", children: [_jsx(Button, { onClick: fillWithDefaults, variant: "secondary", disabled: submitting, children: "\uD83D\uDCCB Use Defaults" }), _jsx(Button, { onClick: resetForm, variant: "secondary", disabled: submitting, children: "\uD83D\uDD04 Clear Form" }), isSaving && _jsx("span", { className: "text-sm text-slate-500 dark:text-slate-400", children: "\uD83D\uDCBE Saving..." })] }), _jsx("div", { className: "space-y-6", children: fields.map(function (field) {
                            var _a;
                            return (_jsx("div", { children: field.type === 'checkbox' ? (_jsxs("label", { className: "flex items-center gap-3", children: [_jsx("input", { type: "checkbox", checked: Boolean(values[field.name]), onChange: function (e) { return setFieldValue(field.name, e.target.checked); }, className: "h-5 w-5", disabled: submitting }), _jsx("span", { className: "text-slate-700 dark:text-slate-300", children: field.label })] })) : field.type === 'dropdown' && field.options ? (_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1", children: field.label }), _jsxs("select", { value: String(values[field.name] || ''), onChange: function (e) { return setFieldValue(field.name, e.target.value); }, className: "form-input w-full", disabled: submitting, children: [_jsx("option", { value: "", children: "Select..." }), (_a = field.options) === null || _a === void 0 ? void 0 : _a.map(function (opt) { return (_jsx("option", { value: opt, children: opt }, opt)); })] }), validationErrors[field.name] && (_jsx("p", { className: "text-sm text-red-600 dark:text-red-400 mt-1", children: validationErrors[field.name] }))] })) : (_jsx(Input, { label: field.label, type: field.type === 'date' ? 'date' : 'text', value: String(values[field.name] || ''), onChange: function (e) { return setFieldValue(field.name, e.target.value); }, placeholder: field.placeholder, maxLength: field.maxLength, required: field.required, disabled: submitting, error: validationErrors[field.name] })) }, field.name));
                        }) }), _jsx("div", { className: "flex gap-2 border-t border-slate-200 pt-6 dark:border-slate-700", children: _jsx(Button, { type: "submit", variant: "primary", loading: submitting, className: "flex-1", children: "\uD83D\uDCE5 Generate & Download PDF" }) })] }), _jsxs("div", { className: "card p-6", children: [_jsx("h3", { className: "font-semibold text-slate-900 dark:text-slate-100", children: "Form Information" }), _jsxs("dl", { className: "mt-4 space-y-2 text-sm", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("dt", { className: "text-slate-600 dark:text-slate-400", children: "Total Fields:" }), _jsx("dd", { className: "text-slate-900 dark:text-slate-100", children: fields.length })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("dt", { className: "text-slate-600 dark:text-slate-400", children: "Required Fields:" }), _jsx("dd", { className: "text-slate-900 dark:text-slate-100", children: fields.filter(function (f) { return f.required; }).length })] })] })] })] }));
}
