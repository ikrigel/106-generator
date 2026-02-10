/**
 * Internationalization (i18n) - English and Hebrew translations
 */

export type Language = 'en' | 'he';

export const translations = {
  en: {
    // Common
    appName: 'MOC 106 Form Generator',
    language: 'Language',
    english: 'English',
    hebrew: 'Hebrew',

    // Navigation
    form: 'Form',
    settings: 'Settings',
    logs: 'Logs',
    help: 'Help',
    about: 'About',

    // Form Page
    formHeading: 'MOC 106 Form',
    formDescription: 'Fill in the form fields and download your customized PDF',
    useDefaults: '📋 Use Defaults',
    clearForm: '🔄 Clear Form',
    generatePdf: '📥 Generate & Download PDF',
    formInformation: 'Form Information',
    totalFields: 'Total Fields:',
    requiredFields: 'Required Fields:',
    saving: '💾 Saving...',
    pdfGeneratedSuccess: 'PDF generated and downloaded successfully!',
    pleaseCorrectFields: 'Please correct',
    fieldError: 'field(s)',

    // Form Fields - Personal Information
    'full_name': 'Full Name',
    'id_number': 'ID Number',
    'date_of_birth': 'Date of Birth',
    'marital_status': 'Marital Status',
    'address': 'Address',
    'city': 'City',
    'postal_code': 'Postal Code',
    'phone': 'Phone Number',
    'email': 'Email Address',

    // Form Fields - Income Information
    'salary_wages': 'Salary / Wages',
    'self_employment_income': 'Self-Employment Income',
    'interest_income': 'Interest Income',
    'dividend_income': 'Dividend Income',
    'rental_income': 'Rental Income',
    'other_income': 'Other Income',
    'total_income': 'Total Income',

    // Form Fields - Deductions
    'professional_expenses': 'Professional Expenses',
    'charitable_donations': 'Charitable Donations',
    'mortgage_interest': 'Mortgage Interest',
    'medical_expenses': 'Medical Expenses',
    'life_insurance_premiums': 'Life Insurance Premiums',
    'education_expenses': 'Education Expenses',
    'child_support_alimony': 'Child Support / Alimony',
    'total_deductions': 'Total Deductions',

    // Form Fields - Tax Information
    'taxable_income': 'Taxable Income',
    'income_tax_withheld': 'Income Tax Withheld',
    'vat_paid': 'VAT Paid',
    'estimated_tax_payments': 'Estimated Tax Payments',
    'total_tax_credits': 'Total Tax Credits',
    'tax_due': 'Total Tax Due',

    // Form Fields - Additional Information
    'statement_date': 'Statement Date',
    'preparer_name': 'Preparer Name (if applicable)',
    'preparer_signature': 'Preparer Signature',
    'taxpayer_signature': 'Taxpayer Signature',
    'notes': 'Additional Notes',

    // Settings Page
    settingsHeading: 'Settings',
    settingsDescription: 'Customize your preferences and application behavior',
    formSettings: 'Form Settings',
    autoSaveFormProgress: 'Auto-save Form Progress',
    autoSaveInterval: 'Auto-save Interval (seconds)',
    autoSaveSettingUpdated: 'Auto-save setting updated',
    autoSaveIntervalUpdated: 'Auto-save interval updated',

    pdfSettings: 'PDF Settings',
    pdfFilenamePattern: 'PDF Filename Pattern',
    includeTimestamp: 'Include Timestamp',
    pdfFilenameUpdated: 'PDF filename setting updated',
    useTimestampOrDate: 'Use {timestamp} or {date} for dynamic values',

    loggingSettings: 'Logging Settings',
    enableLogging: 'Enable Logging',
    minimumLogLevel: 'Minimum Log Level',
    maxLogEntries: 'Max Log Entries',
    loggingSettingUpdated: 'Logging setting updated',
    logLevelUpdated: 'Log level updated',
    maxEntriesUpdated: 'Max log entries updated',

    dataManagement: 'Data Management',
    exportSettings: 'Export Settings',
    importSettings: 'Import Settings',
    resetSettings: 'Reset Settings',
    clearFormData: 'Clear Form Data',
    settingsExportedSuccess: 'Settings exported successfully',
    settingsExportedError: 'Failed to export settings:',
    settingsImportedSuccess: 'Settings imported successfully',
    settingsImportedError: 'Failed to import settings:',
    settingsResetSuccess: 'Settings reset to defaults',
    formDataClearedSuccess: 'Form data cleared successfully',

    settingsInformation: 'Settings Information',
    created: 'Created:',
    lastUpdated: 'Last Updated:',
    version: 'Version:',

    confirmResetSettings: 'Are you sure you want to reset all settings to defaults?',
    confirmClearFormData: 'Are you sure you want to clear all saved form data? This cannot be undone.',

    // Theme
    lightTheme: 'Light',
    darkTheme: 'Dark',
    autoTheme: 'Auto',

    // PDF
    personalInformation: 'PERSONAL INFORMATION',
    incomeInformation: 'INCOME INFORMATION',
    deductions: 'DEDUCTIONS',
    taxCalculation: 'TAX CALCULATION',
    additionalInformation: 'ADDITIONAL INFORMATION',
    mocFormTitle: 'MOC 106 Income Tax Return Form - 2024',
    generatedDate: 'Generated:',

    // Validation
    requiredField: 'This field is required',
    invalidEmail: 'Please enter a valid email address',
    invalidDate: 'Please enter a valid date',
  },
  he: {
    // Common
    appName: 'מחולל טופס MOC 106',
    language: 'שפה',
    english: 'אנגלית',
    hebrew: 'עברית',

    // Navigation
    form: 'טופס',
    settings: 'הגדרות',
    logs: 'יומנים',
    help: 'עזרה',
    about: 'אודות',

    // Form Page
    formHeading: 'טופס MOC 106',
    formDescription: 'מלא את שדות הטופס והוריד את קובץ ה-PDF המותאם שלך',
    useDefaults: '📋 השתמש בערכים ברירת המחדל',
    clearForm: '🔄 נקה טופס',
    generatePdf: '📥 צור והוריד PDF',
    formInformation: 'מידע הטופס',
    totalFields: 'סך הכל שדות:',
    requiredFields: 'שדות חובה:',
    saving: '💾 שמירה...',
    pdfGeneratedSuccess: 'PDF נוצר והורד בהצלחה!',
    pleaseCorrectFields: 'אנא תקן',
    fieldError: 'שדה(ות)',

    // Form Fields - Personal Information
    'full_name': 'שם מלא',
    'id_number': 'מספר זהות',
    'date_of_birth': 'תאריך לידה',
    'marital_status': 'מצב משפחתי',
    'address': 'כתובת',
    'city': 'עיר',
    'postal_code': 'מיקוד',
    'phone': 'מספר טלפון',
    'email': 'כתובת אימייל',

    // Form Fields - Income Information
    'salary_wages': 'משכורת / שכר',
    'self_employment_income': 'הכנסה עצמאית',
    'interest_income': 'הכנסה מריבית',
    'dividend_income': 'הכנסה מדיווידנדים',
    'rental_income': 'הכנסה משכרת',
    'other_income': 'הכנסה אחרת',
    'total_income': 'סך הכנסה',

    // Form Fields - Deductions
    'professional_expenses': 'הוצאות מקצועיות',
    'charitable_donations': 'תרומות לטובת הציבור',
    'mortgage_interest': 'ריבית משכנתא',
    'medical_expenses': 'הוצאות רפואיות',
    'life_insurance_premiums': 'דמי ביטוח חיים',
    'education_expenses': 'הוצאות חינוך',
    'child_support_alimony': 'דמי כלכלה / גיור',
    'total_deductions': 'סך הכל ניכויים',

    // Form Fields - Tax Information
    'taxable_income': 'הכנסה חייבת במס',
    'income_tax_withheld': 'מס הכנסה שנעצר',
    'vat_paid': 'מע"מ ששולם',
    'estimated_tax_payments': 'תשלומים משוערים של מס',
    'total_tax_credits': 'סך זיכויים במס',
    'tax_due': 'סך המס לתשלום',

    // Form Fields - Additional Information
    'statement_date': 'תאריך ההצהרה',
    'preparer_name': 'שם כותב הטופס (במידת הצורך)',
    'preparer_signature': 'חתימת כותב הטופס',
    'taxpayer_signature': 'חתימת מחזיק הזכות',
    'notes': 'הערות נוספות',

    // Settings Page
    settingsHeading: 'הגדרות',
    settingsDescription: 'התאם את ההעדפות שלך והתנהגות היישום',
    formSettings: 'הגדרות טופס',
    autoSaveFormProgress: 'שמור את התקדמות הטופס באופן אוטומטי',
    autoSaveInterval: 'מרווח שמירה אוטומטי (שניות)',
    autoSaveSettingUpdated: 'הגדרת השמירה האוטומטית עודכנה',
    autoSaveIntervalUpdated: 'מרווח השמירה האוטומטי עודכן',

    pdfSettings: 'הגדרות PDF',
    pdfFilenamePattern: 'דפוס שם קובץ PDF',
    includeTimestamp: 'כלול חותמת זמן',
    pdfFilenameUpdated: 'הגדרת שם קובץ PDF עודכנה',
    useTimestampOrDate: 'השתמש ב-{timestamp} או {date} לערכים דינמיים',

    loggingSettings: 'הגדרות רישום',
    enableLogging: 'אפשר רישום',
    minimumLogLevel: 'רמת רישום מינימלית',
    maxLogEntries: 'כמות ערכי יומן מקסימלית',
    loggingSettingUpdated: 'הגדרת הרישום עודכנה',
    logLevelUpdated: 'רמת הרישום עודכנה',
    maxEntriesUpdated: 'כמות ערכי היומן המקסימלית עודכנה',

    dataManagement: 'ניהול נתונים',
    exportSettings: 'ייצא הגדרות',
    importSettings: 'ייבא הגדרות',
    resetSettings: 'איפס הגדרות',
    clearFormData: 'נקה נתוני טופס',
    settingsExportedSuccess: 'הגדרות יוצאו בהצלחה',
    settingsExportedError: 'הייצוא של הגדרות נכשל:',
    settingsImportedSuccess: 'הגדרות יובאו בהצלחה',
    settingsImportedError: 'ייבוא הגדרות נכשל:',
    settingsResetSuccess: 'הגדרות אופסו לברירות המחדל',
    formDataClearedSuccess: 'נתוני הטופס נוקו בהצלחה',

    settingsInformation: 'מידע הגדרות',
    created: 'נוצר:',
    lastUpdated: 'עודכן לאחרונה:',
    version: 'גרסה:',

    confirmResetSettings: 'האם אתה בטוח שברצונך לאפס את כל ההגדרות לברירות המחדל?',
    confirmClearFormData: 'האם אתה בטוח שברצונך לנקות את כל נתוני הטופס השמורים? לא ניתן לבטל פעולה זו.',

    // Theme
    lightTheme: 'אור',
    darkTheme: 'חושך',
    autoTheme: 'אוטומטי',

    // PDF
    personalInformation: 'מידע אישי',
    incomeInformation: 'מידע על הכנסה',
    deductions: 'ניכויים',
    taxCalculation: 'חישוב מס',
    additionalInformation: 'מידע נוסף',
    mocFormTitle: 'טופס הדלקה MOC 106 - 2024',
    generatedDate: 'נוצר ב:',

    // Validation
    requiredField: 'שדה זה נדרש',
    invalidEmail: 'אנא הכנס כתובת דוא"ל תקפה',
    invalidDate: 'אנא הכנס תאריך תקף',
  },
};

/**
 * Get translation for a key, optionally with placeholders
 */
export function t(
  language: Language,
  key: keyof typeof translations.en,
  placeholders?: Record<string, string>
): string {
  const text = (translations as Record<Language, Record<string, string>>)[language][key];
  if (!text) return String(key);

  if (!placeholders) return text;

  let result = text;
  for (const [k, value] of Object.entries(placeholders)) {
    result = result.replace(`{${k}}`, value);
  }
  return result;
}
