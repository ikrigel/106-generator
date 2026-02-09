import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Alert(_a) {
    var type = _a.type, title = _a.title, message = _a.message, onClose = _a.onClose;
    var colors = {
        success: 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300 border-green-200 dark:border-green-700',
        error: 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300 border-red-200 dark:border-red-700',
        warning: 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700',
        info: 'bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 border-blue-200 dark:border-blue-700',
    };
    return (_jsx("div", { className: "rounded-lg border p-4 ".concat(colors[type]), children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { children: [title && _jsx("h3", { className: "font-semibold mb-1", children: title }), _jsx("p", { children: message })] }), onClose && (_jsx("button", { onClick: onClose, className: "ml-4 text-xl leading-none", children: "\u00D7" }))] }) }));
}
