export declare function useFormState(fields: {
    name: string;
}[]): {
    values: Record<string, string | boolean>;
    setFieldValue: (name: string, value: string | boolean) => void;
    resetForm: () => void;
    fillWithDefaults: () => void;
    isSaving: boolean;
    lastSaved: string;
};
