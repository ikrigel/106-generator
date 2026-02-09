var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Alert } from '../ui/Alert';
var ErrorBoundary = /** @class */ (function (_super) {
    __extends(ErrorBoundary, _super);
    function ErrorBoundary(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { hasError: false, error: null };
        return _this;
    }
    ErrorBoundary.getDerivedStateFromError = function (error) {
        return { hasError: true, error: error };
    };
    ErrorBoundary.prototype.componentDidCatch = function (error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    };
    ErrorBoundary.prototype.render = function () {
        var _a;
        if (this.state.hasError) {
            return (_jsx("div", { className: "min-h-screen bg-white dark:bg-slate-950 p-4", children: _jsxs("div", { className: "mx-auto max-w-md pt-20", children: [_jsx(Alert, { type: "error", title: "Something went wrong", message: ((_a = this.state.error) === null || _a === void 0 ? void 0 : _a.message) || 'An unexpected error occurred' }), _jsx("button", { onClick: function () { return window.location.reload(); }, className: "btn-primary mt-4 w-full", children: "Reload Page" })] }) }));
        }
        return this.props.children;
    };
    return ErrorBoundary;
}(React.Component));
export { ErrorBoundary };
