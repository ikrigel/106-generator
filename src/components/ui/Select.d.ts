import React from 'react';
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: {
        value: string;
        label: string;
    }[];
}
export declare function Select({ label, error, options, className, ...props }: SelectProps): import("react/jsx-runtime").JSX.Element;
export {};
