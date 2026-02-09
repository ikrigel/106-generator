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
import { useState, useCallback, useEffect } from 'react';
import { storageService } from '@/services/storageService';
import { useSettings } from './useSettings';
import { FORM_AUTO_SAVE_DELAY } from '@/constants/defaults';
export function useFormState(fields) {
    var settings = useSettings().settings;
    var _a = useState(function () {
        var savedData = storageService.getFormData();
        if (savedData) {
            return savedData.fields;
        }
        // Initialize with default values from settings, or empty strings
        return Object.fromEntries(fields.map(function (f) { return [
            f.name,
            settings.user.defaultValues[f.name] || '',
        ]; }));
    }), values = _a[0], setValues = _a[1];
    var _b = useState(false), isSaving = _b[0], setIsSaving = _b[1];
    var _c = useState(null), lastSaved = _c[0], setLastSaved = _c[1];
    // Auto-save effect
    useEffect(function () {
        if (!settings.user.autoSave)
            return;
        var timeout = setTimeout(function () {
            var formData = {
                version: '1.0.0',
                fields: values,
                lastSaved: new Date().toISOString(),
                isComplete: false,
            };
            setIsSaving(true);
            storageService.setFormData(formData);
            setLastSaved(formData.lastSaved);
            setIsSaving(false);
        }, FORM_AUTO_SAVE_DELAY);
        return function () { return clearTimeout(timeout); };
    }, [values, settings.user.autoSave]);
    var setFieldValue = useCallback(function (name, value) {
        setValues(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = value, _a)));
        });
    }, []);
    var resetForm = useCallback(function () {
        var initial = Object.fromEntries(fields.map(function (f) { return [f.name, '']; }));
        setValues(initial);
        storageService.clearFormData();
        setLastSaved(null);
    }, [fields]);
    var fillWithDefaults = useCallback(function () {
        var withDefaults = Object.fromEntries(fields.map(function (f) { return [
            f.name,
            settings.user.defaultValues[f.name] || '',
        ]; }));
        setValues(withDefaults);
    }, [fields, settings.user.defaultValues]);
    return {
        values: values,
        setFieldValue: setFieldValue,
        resetForm: resetForm,
        fillWithDefaults: fillWithDefaults,
        isSaving: isSaving,
        lastSaved: lastSaved,
    };
}
