import React from 'react';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    children: React.ReactNode;
}
export declare function Button({ variant, size, loading, disabled, className, children, ...props }: ButtonProps): import("react/jsx-runtime").JSX.Element;
export {};
