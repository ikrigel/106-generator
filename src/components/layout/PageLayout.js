import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Header } from './Header';
import { Footer } from './Footer';
export function PageLayout(_a) {
    var children = _a.children;
    return (_jsxs("div", { className: "flex min-h-screen flex-col bg-white dark:bg-slate-950", children: [_jsx(Header, {}), _jsx("main", { className: "flex-1", children: _jsx("div", { className: "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8", children: children }) }), _jsx(Footer, {})] }));
}
