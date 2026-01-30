"use server"

import { cartQuery } from "@/lib/shopify/queries/cart"
import { storefront } from "@/lib/shopify/storefront"
import { getCartByIdVariables } from "@/lib/shopify/variables"
import type { CartQuery } from "@/lib/shopify/types"
import { isDev } from "@/config/settings.config"

export const getCartById = async (cartId: string) => {
    try {
        const {
            data: {
                cart
            }
        } = await storefront<CartQuery>({
            query: cartQuery,
            variables: getCartByIdVariables(cartId),
            revalidate: 0
        })
        
        return cart
    } catch (error) {
        if (isDev) {
            console.error("GET CART BY ID ERROR: ", error)
        }

        if (error instanceof Error) {
            throw new Error(error.message)
        }

        throw new Error("Something went wrong.")
    }
}