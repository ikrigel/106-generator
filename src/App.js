import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PageLayout } from '@/components/layout/PageLayout';
import FormGenerator from '@/pages/FormGenerator';
import Settings from '@/pages/Settings';
import Logs from '@/pages/Logs';
import Help from '@/pages/Help';
import About from '@/pages/About';
import { ROUTES } from '@/constants/routes';
export default function App() {
    return (_jsx(Router, { children: _jsx(Routes, { children: _jsx(Route, { path: "*", element: _jsx(PageLayout, { children: _jsxs(Routes, { children: [_jsx(Route, { path: ROUTES.HOME, element: _jsx(Navigate, { to: ROUTES.FORM, replace: true }) }), _jsx(Route, { path: ROUTES.FORM, element: _jsx(FormGenerator, {}) }), _jsx(Route, { path: ROUTES.SETTINGS, element: _jsx(Settings, {}) }), _jsx(Route, { path: ROUTES.LOGS, element: _jsx(Logs, {}) }), _jsx(Route, { path: ROUTES.HELP, element: _jsx(Help, {}) }), _jsx(Route, { path: ROUTES.ABOUT, element: _jsx(About, {}) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }) }) }) }) }));
}
function NotFound() {
    return (_jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-4xl font-bold text-slate-900 dark:text-slate-100", children: "404" }), _jsx("p", { className: "mt-2 text-slate-600 dark:text-slate-400", children: "Page not found" }), _jsx("a", { href: ROUTES.FORM, className: "mt-4 inline-block btn-primary", children: "Back to Form" })] }));
}
