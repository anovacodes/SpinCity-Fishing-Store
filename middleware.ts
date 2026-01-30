import { auth } from "@/lib/auth/auth"
import { 
    API_AUTH_PREFIX, 
    AUTH_ROUTES, 
    DEFAULT_LOGIN_REDIRECT, 
    PRIVATE_ROUTES, 
    SIGN_IN_ROUTE 
} from "./auth.routes"

export default auth(req => {
    const { 
        nextUrl: { pathname }, 
        auth 
    } = req

    const isLoggedIn = !!auth

    const isApiAuthRoute = pathname.startsWith(API_AUTH_PREFIX)
    const isPrivateRoute = PRIVATE_ROUTES.includes(pathname)
    const isAuthRoute = AUTH_ROUTES.includes(pathname)

    if (isApiAuthRoute) {
        return 
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            const url = new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl)

            return Response.redirect(url)
        }

        return 
    }

    if (!isLoggedIn && isPrivateRoute) {
        const url = new URL(SIGN_IN_ROUTE, req.nextUrl)

        return Response.redirect(url)
    }

    return 
})

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ]
}