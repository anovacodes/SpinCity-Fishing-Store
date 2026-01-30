"use server"

import { isDev } from "@/config/settings.config"
import { productQuery } from "@/lib/shopify/queries/products"
import { storefront } from "@/lib/shopify/storefront"
import type { Product, ProductQuery } from "@/lib/shopify/types"
import { productVariables } from "@/lib/shopify/variables"

export const getProduct = async (slug: string): Promise<Product | null> => {
    try {
        const { data: { product }} = await storefront<ProductQuery>({
            query: productQuery,
            variables: productVariables(slug),
            revalidate: 7200
        })
        
        return product
    } catch (error) {
        if (error instanceof Error && isDev) {
            console.error("GET PRODUCT ERROR: ", error.message)
        }

        return null
    }
}