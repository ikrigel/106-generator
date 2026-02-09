/**
 * PDF service
 * Handles PDF field extraction, filling, and generation
 */
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
import { PDFDocument, rgb } from 'pdf-lib';
import { storageService } from './storageService';
import { downloadPdf } from '@/utils/fileDownload';
import { formatFilenameWithTimestamp } from '@/utils/dateFormatter';
import { sanitizeForPdf } from '@/utils/textSanitizer';
import { PDF_SOURCE_URL } from '@/constants/defaults';
import { DEFAULT_FORM_FIELDS } from '@/constants/formFields';
var PdfService = /** @class */ (function () {
    function PdfService() {
    }
    /**
     * Extract form fields from PDF
     */
    PdfService.prototype.extractPdfFields = function () {
        return __awaiter(this, arguments, void 0, function (pdfUrl) {
            var response, arrayBuffer, pdfDoc, form, fields, extractedFields, _i, fields_1, field, name_1, fieldType, type, options, fieldObject, fieldsToReturn, cache, error_1, errorMessage;
            if (pdfUrl === void 0) { pdfUrl = PDF_SOURCE_URL; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, fetch(pdfUrl)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) {
                            throw new Error("Failed to fetch PDF: ".concat(response.statusText));
                        }
                        return [4 /*yield*/, response.arrayBuffer()];
                    case 2:
                        arrayBuffer = _a.sent();
                        return [4 /*yield*/, PDFDocument.load(arrayBuffer)];
                    case 3:
                        pdfDoc = _a.sent();
                        form = pdfDoc.getForm();
                        fields = form.getFields();
                        extractedFields = [];
                        for (_i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
                            field = fields_1[_i];
                            name_1 = field.getName();
                            fieldType = field.constructor.name;
                            type = 'text';
                            if (fieldType.includes('Text')) {
                                type = 'text';
                            }
                            else if (fieldType.includes('CheckBox')) {
                                type = 'checkbox';
                            }
                            else if (fieldType.includes('Radio')) {
                                type = 'radio';
                            }
                            else if (fieldType.includes('Signature')) {
                                type = 'signature';
                            }
                            else if (fieldType.includes('Button')) {
                                type = 'button';
                            }
                            else if (fieldType.includes('Date')) {
                                type = 'date';
                            }
                            options = void 0;
                            try {
                                if (type === 'radio' || type === 'button') {
                                    fieldObject = field;
                                    options = fieldObject === null || fieldObject === void 0 ? void 0 : fieldObject.___options;
                                }
                            }
                            catch (_b) {
                                // Ignore errors when getting options
                            }
                            extractedFields.push({
                                name: name_1,
                                type: type,
                                label: this.deriveLabel(name_1),
                                options: options,
                            });
                        }
                        fieldsToReturn = extractedFields.length > 0
                            ? extractedFields
                            : DEFAULT_FORM_FIELDS;
                        cache = {
                            version: arrayBuffer.byteLength.toString(),
                            fields: fieldsToReturn,
                            extractedAt: new Date().toISOString(),
                        };
                        storageService.setPdfFields(cache);
                        return [2 /*return*/, {
                                success: true,
                                fields: fieldsToReturn,
                                message: extractedFields.length > 0
                                    ? "Extracted ".concat(extractedFields.length, " fields from PDF")
                                    : "No form fields found in PDF, using default form",
                            }];
                    case 4:
                        error_1 = _a.sent();
                        errorMessage = error_1 instanceof Error ? error_1.message : String(error_1);
                        return [2 /*return*/, {
                                success: false,
                                fields: [],
                                error: errorMessage,
                                message: "Failed to extract PDF fields: ".concat(errorMessage),
                            }];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Generate a new PDF document from form data (no template needed)
     * Creates a clean, professional form document with user data
     */
    PdfService.prototype.generatePdfFromScratch = function (formData) {
        return __awaiter(this, void 0, void 0, function () {
            var pdfDoc, page, _a, width, height, yPosition, margin, lineHeight, sectionSpacing, _i, _b, _c, key, value, label, displayLabel, displayValue, sanitizedLabel, sanitizedValue, timestamp, pdfBytes, error_2, errorMessage;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, PDFDocument.create()];
                    case 1:
                        pdfDoc = _d.sent();
                        page = pdfDoc.addPage([595, 842]);
                        _a = page.getSize(), width = _a.width, height = _a.height;
                        yPosition = height - 50;
                        margin = 40;
                        lineHeight = 25;
                        sectionSpacing = 35;
                        // Title
                        page.drawText('MOC 106 Form - 2024', {
                            x: margin,
                            y: yPosition,
                            size: 18,
                            color: rgb(0, 0, 0),
                        });
                        yPosition -= sectionSpacing;
                        // Form data section
                        page.drawText('Form Information:', {
                            x: margin,
                            y: yPosition,
                            size: 14,
                            color: rgb(0, 0, 0),
                        });
                        yPosition -= lineHeight;
                        // Display all form fields
                        for (_i = 0, _b = Object.entries(formData); _i < _b.length; _i++) {
                            _c = _b[_i], key = _c[0], value = _c[1];
                            if (value) {
                                label = key.replace(/([A-Z])/g, ' $1').trim();
                                displayLabel = label.charAt(0).toUpperCase() + label.slice(1);
                                displayValue = String(value);
                                sanitizedLabel = sanitizeForPdf("".concat(displayLabel, ":"));
                                sanitizedValue = sanitizeForPdf(displayValue);
                                page.drawText(sanitizedLabel, {
                                    x: margin,
                                    y: yPosition,
                                    size: 11,
                                    color: rgb(0, 0, 0),
                                });
                                // rgb values must be 0-1, not 0-255. rgb(0, 102, 204) -> rgb(0, 0.4, 0.8)
                                page.drawText(sanitizedValue, {
                                    x: margin + 150,
                                    y: yPosition,
                                    size: 11,
                                    color: rgb(0, 0.4, 0.8),
                                });
                                yPosition -= lineHeight;
                                // Add page break if needed
                                if (yPosition < 50) {
                                    page = pdfDoc.addPage([595, 842]);
                                    yPosition = height - margin;
                                }
                            }
                        }
                        timestamp = new Date().toLocaleString();
                        page.drawText("Generated: ".concat(timestamp), {
                            x: margin,
                            y: 20,
                            size: 9,
                            color: rgb(0.5, 0.5, 0.5),
                        });
                        return [4 /*yield*/, pdfDoc.save()];
                    case 2:
                        pdfBytes = _d.sent();
                        return [2 /*return*/, {
                                success: true,
                                data: pdfBytes,
                                message: 'PDF generated successfully',
                            }];
                    case 3:
                        error_2 = _d.sent();
                        errorMessage = error_2 instanceof Error ? error_2.message : String(error_2);
                        return [2 /*return*/, {
                                success: false,
                                error: errorMessage,
                                message: "Failed to generate PDF: ".concat(errorMessage),
                            }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Fill PDF with data and return as Uint8Array
     * Falls back to generating from scratch if template PDF doesn't have form fields
     */
    PdfService.prototype.fillPdfFields = function (formData_1) {
        return __awaiter(this, arguments, void 0, function (formData, pdfUrl) {
            var response, arrayBuffer, pdfDoc, form, fields, filledAnyField, _i, _a, _b, fieldName, value, field, fieldType, pdfBytes, error_3;
            var _c, _d, _e, _f, _g;
            if (pdfUrl === void 0) { pdfUrl = PDF_SOURCE_URL; }
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        _h.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, fetch(pdfUrl)];
                    case 1:
                        response = _h.sent();
                        if (!response.ok) {
                            throw new Error("Failed to fetch PDF: ".concat(response.statusText));
                        }
                        return [4 /*yield*/, response.arrayBuffer()];
                    case 2:
                        arrayBuffer = _h.sent();
                        return [4 /*yield*/, PDFDocument.load(arrayBuffer)];
                    case 3:
                        pdfDoc = _h.sent();
                        form = pdfDoc.getForm();
                        fields = form.getFields();
                        // If no form fields exist, generate from scratch instead
                        if (fields.length === 0) {
                            return [2 /*return*/, this.generatePdfFromScratch(formData)];
                        }
                        filledAnyField = false;
                        for (_i = 0, _a = Object.entries(formData); _i < _a.length; _i++) {
                            _b = _a[_i], fieldName = _b[0], value = _b[1];
                            try {
                                field = form.getFieldMaybe(fieldName);
                                if (!field)
                                    continue;
                                filledAnyField = true;
                                fieldType = field.constructor.name;
                                if (fieldType.includes('CheckBox')) {
                                    if (value === true) {
                                        (_c = field.check) === null || _c === void 0 ? void 0 : _c.call(field);
                                    }
                                    else {
                                        (_d = field.uncheck) === null || _d === void 0 ? void 0 : _d.call(field);
                                    }
                                }
                                else if (fieldType.includes('Radio') || fieldType.includes('Button')) {
                                    (_e = field.select) === null || _e === void 0 ? void 0 : _e.call(field, String(value));
                                }
                                else if (fieldType.includes('Text')) {
                                    (_f = field.setText) === null || _f === void 0 ? void 0 : _f.call(field, String(value));
                                }
                                else {
                                    (_g = field.setText) === null || _g === void 0 ? void 0 : _g.call(field, String(value));
                                }
                            }
                            catch (fieldError) {
                                console.warn("Error filling field ".concat(fieldName, ":"), fieldError);
                            }
                        }
                        // If no fields were filled, generate from scratch
                        if (!filledAnyField) {
                            return [2 /*return*/, this.generatePdfFromScratch(formData)];
                        }
                        form.flatten();
                        return [4 /*yield*/, pdfDoc.save()];
                    case 4:
                        pdfBytes = _h.sent();
                        return [2 /*return*/, {
                                success: true,
                                data: pdfBytes,
                                message: 'PDF filled successfully',
                            }];
                    case 5:
                        error_3 = _h.sent();
                        // Fallback to generating PDF from scratch on any error
                        return [2 /*return*/, this.generatePdfFromScratch(formData)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Generate and download filled PDF
     */
    PdfService.prototype.generateAndDownloadPdf = function (formData_1) {
        return __awaiter(this, arguments, void 0, function (formData, options, pdfUrl) {
            var fillResult, baseFilename, finalFilename, error_4, errorMessage;
            if (options === void 0) { options = {}; }
            if (pdfUrl === void 0) { pdfUrl = PDF_SOURCE_URL; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.fillPdfFields(formData, pdfUrl)];
                    case 1:
                        fillResult = _a.sent();
                        if (!fillResult.success || !fillResult.data) {
                            return [2 /*return*/, {
                                    success: false,
                                    error: fillResult.error,
                                    message: fillResult.message,
                                }];
                        }
                        baseFilename = options.filename || 'MOC_106_Form_{timestamp}.pdf';
                        finalFilename = formatFilenameWithTimestamp(baseFilename, options.includeTimestamp !== false);
                        // Download if not explicitly disabled
                        if (options.autoDownload !== false) {
                            downloadPdf(fillResult.data, finalFilename);
                        }
                        return [2 /*return*/, {
                                success: true,
                                message: "PDF generated successfully: ".concat(finalFilename),
                            }];
                    case 2:
                        error_4 = _a.sent();
                        errorMessage = error_4 instanceof Error ? error_4.message : String(error_4);
                        return [2 /*return*/, {
                                success: false,
                                error: errorMessage,
                                message: "Failed to generate PDF: ".concat(errorMessage),
                            }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Derive human-readable label from field name
     * Converts "firstName" to "First Name"
     */
    PdfService.prototype.deriveLabel = function (fieldName) {
        return (fieldName
            // Insert space before uppercase letters
            .replace(/([A-Z])/g, ' $1')
            // Replace underscores with spaces
            .replace(/_/g, ' ')
            // Capitalize first letter of each word
            .replace(/\b\w/g, function (char) { return char.toUpperCase(); })
            // Clean up extra spaces
            .trim());
    };
    return PdfService;
}());
export var pdfService = new PdfService();
