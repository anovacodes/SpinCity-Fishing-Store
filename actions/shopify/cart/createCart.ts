"use server"

import jwt from "jsonwebtoken"
import getCurrentUser from "@/actions/auth/getCurrentUser"
import {
    CartBuyerIdentityInput,
    CartInputLine,
    CreateCartQuery,
    DecryptedCustomerAccessToken
} from "@/lib/shopify/types"
import { envVariables } from "@/config/env.config"
import { storefront } from "@/lib/shopify/storefront"
import { createCartMutation } from "@/lib/shopify/mutations/cart"
import { createCartVariables } from "@/lib/shopify/variables"
import { isDev } from "@/config/settings.config"

export const createCart = async (cartInput: CartInputLine[]) => {
    try {
        const buyerIdentity: CartBuyerIdentityInput = {
            customerAccessToken: null
        }

        const currentUser = await getCurrentUser()

        if (currentUser) {
            const decryptedCustomerAccessToken: DecryptedCustomerAccessToken = jwt.verify(
                currentUser.encryptedCustomerAccessToken!,
                envVariables.JWT_SECRET
            )

            if (typeof decryptedCustomerAccessToken === "string") {
                throw new Error("Verification failed.")
            }

            if (decryptedCustomerAccessToken) {
                buyerIdentity.customerAccessToken = decryptedCustomerAccessToken.customerAccessToken.accessToken
            }
        }

        const {
            data: {
                cartCreate: { cart }
            }
        } = await storefront<CreateCartQuery>({
            query: createCartMutation,
            variables: createCartVariables(cartInput, buyerIdentity),
            revalidate: 0
        })

        return cart
    } catch (error) {
        if (isDev) {
            console.error("CREATE CART ERROR: ", error)
        }

        if (error instanceof Error) {
            throw new Error(error.message)
        }

        throw new Error("Something went wrong.")
    }
}
