"use server"

import { addItemToCartMutation } from "@/lib/shopify/mutations/cart"
import { storefront } from "@/lib/shopify/storefront"
import { addItemToCartVariables } from "@/lib/shopify/variables"
import type { CartInputLine, CartLinesAddQuery } from "@/lib/shopify/types"
import { isDev } from "@/config/settings.config"

export const addItemToCart = async (cartInput: CartInputLine[], cartId: string) => {
    try {
        const {
            data: {
                cartLinesAdd: {
                    cart,
                    userErrors
                }
            }
        } = await storefront<CartLinesAddQuery>({
            query: addItemToCartMutation,
            variables: addItemToCartVariables(cartInput, cartId),
            revalidate: 0
        })

        return {
            cart,
            userErrors
        }
    } catch (error) {
        if (isDev) {
            console.error("ADD ITEM TO CART ERROR: ", error)
        }

        if (error instanceof Error) {
            throw new Error(error.message)
        }

        throw new Error("Something went wrong.")
    }
}