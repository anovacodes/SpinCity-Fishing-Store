import "server-only"

import type { CustomerWithEncryptedAccessToken } from "@/lib/shopify/types"
import { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import jwt from "jsonwebtoken"
import { signInSchema } from "@/lib/zod/schema"
import { envVariables } from "@/config/env.config"
import { getWishlistByUserId } from "@/actions/prisma/getWishlistByUserId"
import { createAccessToken } from "@/actions/shopify/auth/createAccessToken"
import { getCustomer } from "@/actions/shopify/auth/getCustomer"
import { isDev } from "./settings.config"

export const authConfig = {
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    const { email, password } = await signInSchema.parseAsync(credentials)
                    const { customerAccessToken, customerUserErrors } = await createAccessToken({ email, password })

                    if (customerUserErrors.length) {
                        throw new Error(customerUserErrors[0].message)
                    }

                    const customer: CustomerWithEncryptedAccessToken | null = await getCustomer(
                        customerAccessToken.accessToken
                    )

                    if (!customer) {
                        throw new Error("User not found.")
                    }

                    const encryptedCustomerAccessToken = jwt.sign({ customerAccessToken }, envVariables.JWT_SECRET, {
                        expiresIn: "30d"
                    })

                    customer.encryptedCustomerAccessToken = encryptedCustomerAccessToken

                    const wishlist = await getWishlistByUserId(customer.id)

                    customer.wishlist = wishlist

                    return customer
                } catch (error) {
                    if (error instanceof Error && isDev) {
                        console.error("CREDENTIALS AUTHORIZE ERROR: ", error.message)
                    }

                    return null
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, session, trigger, user }) {
            if (trigger === "update") {
                return {
                    ...token,
                    user: {
                        ...session.user
                    }
                }
            }

            if (token.user) {
                return {
                    ...token
                }
            }

            return { token, user }
        },
        async session({ session, token }) {
            // @ts-ignore
            session.user = token.token.user ? token.token.user : token.user

            return session
        },
        async authorized({ auth }) {
            return !!auth?.user
        }
    },
    pages: {
        signIn: "/auth/sign-in"
    },
    session: {
        strategy: "jwt"
    },
    secret: envVariables.AUTH_SECRET
} satisfies NextAuthConfig
