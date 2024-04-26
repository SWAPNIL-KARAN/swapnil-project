/**
 * An array of routes that are accessible to the public
 * these routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/auth/new-verification"
]

/**
 * An array of routes that are used for authentication
 * These routes will redirect loggen in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register/user",
  "/auth/register/customer",
  "/auth/register/account",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password"
]

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are use for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/user"