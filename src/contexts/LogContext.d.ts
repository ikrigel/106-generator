/**
 * Log Context
 * Manages application logging and event tracking
 */
import React from 'react';
import type { LogContextType } from '@/types/log.types';
export declare const LogContext: React.Context<LogContextType>;
interface LogProviderProps {
    children: React.ReactNode;
}
export declare function LogProvider({ children }: LogProviderProps): import("react/jsx-runtime").JSX.Element;
export {};
