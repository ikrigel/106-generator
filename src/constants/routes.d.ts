/**
 * Route path constants
 * Define all application routes
 */
export declare const ROUTES: {
    readonly HOME: "/";
    readonly FORM: "/form";
    readonly SETTINGS: "/settings";
    readonly LOGS: "/logs";
    readonly HELP: "/help";
    readonly ABOUT: "/about";
};
export type RouteKey = keyof typeof ROUTES;
