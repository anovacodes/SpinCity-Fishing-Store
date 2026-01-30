"use server"

import { storefront } from "@/lib/shopify/storefront"
import { changeCartItemQuantityVariables } from "@/lib/shopify/variables"
import { changeCartItemQuantityMutation } from "@/lib/shopify/mutations/cart"
import type { CartLinesUpdateQuery, CartLineUpdateInput } from "@/lib/shopify/types"
import { isDev } from "@/config/settings.config"

export const changeCartItemQuantity = async (cartId: string, lines: CartLineUpdateInput[]) => {
    try {
        const {
            data: {
                cartLinesUpdate: {
                    cart
                }
            }
        } = await storefront<CartLinesUpdateQuery>({
            query: changeCartItemQuantityMutation,
            variables: changeCartItemQuantityVariables(cartId, lines),
            revalidate: 0
        })

        return cart
    } catch (error) {
        if (isDev) {
            console.error("CHANGE CART ITEM QUANTITY ERROR: ", error)
        }

        if (error instanceof Error) {
            throw new Error(error.message)
        }

        throw new Error("Something went wrong.")
    }
}