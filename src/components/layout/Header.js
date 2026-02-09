import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ThemeSwitcher } from '../common/ThemeSwitcher';
import { ROUTES } from '@/constants/routes';
export function Header() {
    var _a = useState(false), mobileMenuOpen = _a[0], setMobileMenuOpen = _a[1];
    var navLinks = [
        { label: 'Form', href: ROUTES.FORM },
        { label: 'Settings', href: ROUTES.SETTINGS },
        { label: 'Logs', href: ROUTES.LOGS },
        { label: 'Help', href: ROUTES.HELP },
        { label: 'About', href: ROUTES.ABOUT },
    ];
    return (_jsx("header", { className: "border-b border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800", children: _jsxs("nav", { className: "mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs(Link, { to: ROUTES.HOME, className: "flex items-center gap-2", children: [_jsx("span", { className: "text-2xl", children: "\uD83D\uDCCB" }), _jsx("span", { className: "text-lg font-bold text-slate-900 dark:text-slate-100", children: "MOC 106 Generator" })] }), _jsx("div", { className: "hidden gap-8 sm:flex", children: navLinks.map(function (link) { return (_jsx(Link, { to: link.href, className: "text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100", children: link.label }, link.href)); }) }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(ThemeSwitcher, {}), _jsx("button", { onClick: function () { return setMobileMenuOpen(!mobileMenuOpen); }, className: "sm:hidden", "aria-label": "Toggle menu", children: "\u2630" })] })] }), mobileMenuOpen && (_jsx("div", { className: "mt-4 space-y-2 sm:hidden", children: navLinks.map(function (link) { return (_jsx(Link, { to: link.href, className: "block text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100", onClick: function () { return setMobileMenuOpen(false); }, children: link.label }, link.href)); }) }))] }) }));
}
