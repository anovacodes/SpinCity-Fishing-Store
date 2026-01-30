"use server"

import { isDev } from "@/config/settings.config"
import { storefront } from "@/lib/shopify/storefront"
import type { ProductsEdge, ProductsFromCollectionQuery, Variables } from "@/lib/shopify/types"

export const getProductsFromCollection = async (query: string, variables: Variables = {}): Promise<ProductsEdge[]> => {
    try {
        const {
            data: {
                collection: {
                    products: {
                        edges
                    }
                }
            }
        } = await storefront<ProductsFromCollectionQuery>({ query, variables, revalidate: 7200 })
    
        return edges
    } catch (error) {
        if (error instanceof Error && isDev) {
            console.error("GET PRODUCTS FROM COLLECTION ERROR: ", error.message)
        }

        return []
    }
}