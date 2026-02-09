import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Theme Context
 * Manages application theme (light/dark/auto) state
 */
import { createContext, useEffect, useState, useCallback } from 'react';
import { storageService } from '@/services/storageService';
import { DEFAULT_THEME } from '@/constants/defaults';
export var ThemeContext = createContext(undefined);
export function ThemeProvider(_a) {
    var children = _a.children;
    var _b = useState(function () {
        return storageService.getTheme() || DEFAULT_THEME;
    }), theme = _b[0], setThemeState = _b[1];
    var _c = useState(false), isDark = _c[0], setIsDark = _c[1];
    // Handle system theme change
    useEffect(function () {
        var mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        var handleChange = function () {
            if (theme === 'auto') {
                setIsDark(mediaQuery.matches);
            }
        };
        // Set initial state
        if (theme === 'auto') {
            setIsDark(mediaQuery.matches);
        }
        else {
            setIsDark(theme === 'dark');
        }
        // Listen for changes
        mediaQuery.addEventListener('change', handleChange);
        return function () { return mediaQuery.removeEventListener('change', handleChange); };
    }, [theme]);
    // Update DOM and localStorage when theme changes
    useEffect(function () {
        var htmlElement = document.documentElement;
        if (isDark) {
            htmlElement.classList.add('dark');
        }
        else {
            htmlElement.classList.remove('dark');
        }
    }, [isDark]);
    var setTheme = useCallback(function (newTheme) {
        setThemeState(newTheme);
        storageService.setTheme(newTheme);
        // Update isDark based on new theme
        if (newTheme === 'auto') {
            var mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            setIsDark(mediaQuery.matches);
        }
        else {
            setIsDark(newTheme === 'dark');
        }
    }, []);
    var value = {
        theme: theme,
        setTheme: setTheme,
        isDark: isDark,
    };
    return _jsx(ThemeContext.Provider, { value: value, children: children });
}
