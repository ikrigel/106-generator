/**
 * Validation service
 * Handles form validation logic
 */
import { validateForm, getValidationError } from '@/utils/validation';
var ValidationService = /** @class */ (function () {
    function ValidationService() {
    }
    /**
     * Validate form based on fields and values
     */
    ValidationService.prototype.validateFormFields = function (fields, formValues) {
        var _a, _b, _c;
        var validationRules = {};
        // Build validation rules from fields
        for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
            var field = fields_1[_i];
            var rules = {};
            if (field.required) {
                rules.required = true;
            }
            if ((_a = field.validation) === null || _a === void 0 ? void 0 : _a.pattern) {
                rules.pattern = field.validation.pattern;
            }
            if ((_b = field.validation) === null || _b === void 0 ? void 0 : _b.minLength) {
                rules.minLength = field.validation.minLength;
            }
            if ((_c = field.validation) === null || _c === void 0 ? void 0 : _c.maxLength) {
                rules.maxLength = field.validation.maxLength;
            }
            // Infer validation rules from field type
            if (field.type === 'email') {
                rules.email = true;
            }
            else if (field.type === 'tel') {
                rules.phone = true;
            }
            else if (field.type === 'date') {
                rules.date = true;
            }
            validationRules[field.name] = rules;
        }
        return validateForm(formValues, validationRules);
    };
    /**
     * Validate a single field
     */
    ValidationService.prototype.validateField = function (field, value) {
        var _a, _b, _c;
        var validation = {};
        if (field.required) {
            validation.required = true;
        }
        if ((_a = field.validation) === null || _a === void 0 ? void 0 : _a.pattern) {
            validation.pattern = field.validation.pattern;
        }
        if ((_b = field.validation) === null || _b === void 0 ? void 0 : _b.minLength) {
            validation.minLength = field.validation.minLength;
        }
        if ((_c = field.validation) === null || _c === void 0 ? void 0 : _c.maxLength) {
            validation.maxLength = field.validation.maxLength;
        }
        if (field.type === 'email') {
            validation.email = true;
        }
        else if (field.type === 'tel') {
            validation.phone = true;
        }
        else if (field.type === 'date') {
            validation.date = true;
        }
        return getValidationError(field.label || field.name, value, validation);
    };
    /**
     * Check if form is valid
     */
    ValidationService.prototype.isFormValid = function (fields, formValues) {
        var errors = this.validateFormFields(fields, formValues);
        return Object.keys(errors).length === 0;
    };
    /**
     * Check if all required fields are filled
     */
    ValidationService.prototype.areRequiredFieldsFilled = function (fields, formValues) {
        for (var _i = 0, fields_2 = fields; _i < fields_2.length; _i++) {
            var field = fields_2[_i];
            if (field.required) {
                var value = formValues[field.name];
                if (typeof value === 'string') {
                    if (value.trim().length === 0)
                        return false;
                }
                else if (typeof value === 'boolean') {
                    if (!value)
                        return false;
                }
                else if (value === null || value === undefined) {
                    return false;
                }
            }
        }
        return true;
    };
    /**
     * Get first error in form
     */
    ValidationService.prototype.getFirstError = function (errors) {
        for (var _i = 0, _a = Object.values(errors); _i < _a.length; _i++) {
            var error = _a[_i];
            if (error)
                return error;
        }
        return null;
    };
    /**
     * Get field by name
     */
    ValidationService.prototype.getFieldByName = function (fields, fieldName) {
        var _a;
        return (_a = fields.find(function (field) { return field.name === fieldName; })) !== null && _a !== void 0 ? _a : null;
    };
    return ValidationService;
}());
export var validationService = new ValidationService();
