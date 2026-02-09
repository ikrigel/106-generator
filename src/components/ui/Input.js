var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Input(_a) {
    var label = _a.label, error = _a.error, className = _a.className, props = __rest(_a, ["label", "error", "className"]);
    return (_jsxs("div", { children: [label && _jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1", children: label }), _jsx("input", __assign({ className: "form-input ".concat(className || '') }, props)), error && _jsx("p", { className: "text-sm text-red-600 dark:text-red-400 mt-1", children: error })] }));
}
