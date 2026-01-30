"use server"

import { removeItemsFromCartMutation } from "@/lib/shopify/mutations/cart"
import { storefront } from "@/lib/shopify/storefront"
import { removeItemsFromCartVariables } from "@/lib/shopify/variables"
import type { CartLinesRemoveQuery } from "@/lib/shopify/types"
import { isDev } from "@/config/settings.config"

export const removeItemsFromCart = async (lineIds: string[], cartId: string) => {
    try {
        const {
            data: {
                cartLinesRemove: {
                    cart,
                    userErrors
                }
            }
        } = await storefront<CartLinesRemoveQuery>({
            query: removeItemsFromCartMutation,
            variables: removeItemsFromCartVariables(lineIds, cartId),
            revalidate: 0
        })

        return {
            cart, 
            userErrors
        }
    } catch (error) {
        if (isDev) {
            console.error("REMOVE ITEMS FROM CART ERROR: ", error)
        }
        
        if (error instanceof Error) {
            throw new Error(error.message)
        }

        throw new Error("Something went wrong.")
    }
}