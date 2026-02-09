import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Loading(_a) {
    var _b = _a.message, message = _b === void 0 ? 'Loading...' : _b, _c = _a.fullScreen, fullScreen = _c === void 0 ? false : _c;
    var content = (_jsxs("div", { className: "flex flex-col items-center justify-center gap-4", children: [_jsx("div", { className: "h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-sky-500 dark:border-slate-600 dark:border-t-sky-400" }), message && _jsx("p", { className: "text-slate-600 dark:text-slate-400", children: message })] }));
    if (fullScreen) {
        return (_jsx("div", { className: "flex min-h-screen items-center justify-center bg-white dark:bg-slate-950", children: content }));
    }
    return _jsx("div", { className: "flex justify-center py-8", children: content });
}
