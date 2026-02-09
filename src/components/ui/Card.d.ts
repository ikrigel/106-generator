import React from 'react';
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}
export declare function Card({ children, className, ...props }: CardProps): import("react/jsx-runtime").JSX.Element;
export {};
