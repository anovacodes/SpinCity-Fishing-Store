"use server"

import jwt from "jsonwebtoken"
import getCurrentUser from "@/actions/auth/getCurrentUser"
import type {
    CartBuyerIdentityInput,
    CartBuyerIdentityUpdateQuery,
    DecryptedCustomerAccessToken
} from "@/lib/shopify/types"
import { envVariables } from "@/config/env.config"
import { storefront } from "@/lib/shopify/storefront"
import { updateBuyerIdentityMutation } from "@/lib/shopify/mutations/cart"
import { updateBuyerIdentityVartiables } from "@/lib/shopify/variables"
import { isDev } from "@/config/settings.config"

export const updateCartBuyerIdentity = async (cartId: string) => {
    try {
        const buyerIdentity: CartBuyerIdentityInput = {
            customerAccessToken: null
        }

        const currentUser = await getCurrentUser()

        if (!currentUser) {
            return
        }

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

        const {
            data: {
                cartBuyerIdentityUpdate: { cart, userErrors }
            }
        } = await storefront<CartBuyerIdentityUpdateQuery>({
            query: updateBuyerIdentityMutation,
            variables: updateBuyerIdentityVartiables(cartId, buyerIdentity),
            revalidate: 0
        })

        return {
            cart,
            userErrors
        }
    } catch (error) {
        if (isDev) {
            console.error("UPDATE CART BUYER IDENTITY ERROR: ", error)
        }

        if (error instanceof Error) {
            throw new Error(error.message)
        }

        throw new Error("Something went wrong.")
    }
}
