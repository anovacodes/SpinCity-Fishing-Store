export enum AuthorizeAction {
    SIGN_IN = "sign-in",
    SIGN_UP = "sign-up",
    SIGN_OUT = "sign-out",
    RESET = "reset"
}

export const SIGN_IN_ROUTE: string = `/auth/${AuthorizeAction.SIGN_IN}`
export const SIGN_UP_ROUTE: string = `/auth/${AuthorizeAction.SIGN_UP}`
export const RESET_ROUTE: string = `/auth/${AuthorizeAction.RESET}`

export const AUTH_ROUTES: string[] = [
    SIGN_IN_ROUTE,
    SIGN_UP_ROUTE,
    RESET_ROUTE
]

export const PRIVATE_ROUTES: string[] = [
    "/profile/orders",
    "/profile/wishlist",
    "/profile/info"
]

export const API_AUTH_PREFIX: string = "/api/auth"
export const DEFAULT_LOGIN_REDIRECT: string = "/"

export const SIGN_OUT_CALLBACK_URL = `${DEFAULT_LOGIN_REDIRECT}?action=${AuthorizeAction.SIGN_OUT}`