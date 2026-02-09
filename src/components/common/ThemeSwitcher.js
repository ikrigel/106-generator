import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTheme } from '@/hooks/useTheme';
export function ThemeSwitcher() {
    var _a = useTheme(), theme = _a.theme, setTheme = _a.setTheme;
    var themes = [
        { value: 'light', label: 'Light', icon: '☀️' },
        { value: 'dark', label: 'Dark', icon: '🌙' },
        { value: 'auto', label: 'Auto', icon: '🔄' },
    ];
    return (_jsx("div", { className: "flex gap-1 rounded-lg border border-slate-300 bg-slate-100 p-1 dark:border-slate-600 dark:bg-slate-700", children: themes.map(function (_a) {
            var value = _a.value, label = _a.label, icon = _a.icon;
            return (_jsxs("button", { onClick: function () { return setTheme(value); }, title: "Switch to ".concat(label, " theme"), className: "flex items-center gap-1 rounded px-2 py-1 text-sm font-medium transition-colors ".concat(theme === value
                    ? 'bg-white text-slate-900 shadow dark:bg-slate-800 dark:text-slate-100'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'), "aria-label": "".concat(label, " theme"), "aria-pressed": theme === value, children: [_jsx("span", { children: icon }), _jsx("span", { className: "hidden sm:inline", children: label })] }, value));
        }) }));
}
