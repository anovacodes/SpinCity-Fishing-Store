"use server"

import { isDev } from "@/config/settings.config"
import { storefront } from "@/lib/shopify/storefront"
import type { ProductsEdge, ProductsQuery, Variables } from "@/lib/shopify/types"

export const getProducts = async (query: string, variables: Variables = {}): Promise<ProductsEdge[]> => {
    try {
        const {
            data: {
                products: {
                    edges
                }
            }
        } = await storefront<ProductsQuery>({ query, variables, revalidate: 7200 })
    
        return edges
    } catch (error) {
        if (error instanceof Error && isDev) {
            console.error("GET PRODUCTS ERROR: ", error.message)
        }

        return []
    }
}