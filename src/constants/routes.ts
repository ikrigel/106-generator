/**
 * Route path constants
 * Define all application routes
 */

export const ROUTES = {
  HOME: '/',
  FORM: '/form',
  SETTINGS: '/settings',
  LOGS: '/logs',
  HELP: '/help',
  ABOUT: '/about',
} as const;

export type RouteKey = keyof typeof ROUTES;
