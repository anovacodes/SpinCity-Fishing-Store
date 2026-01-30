"use server"

import { isDev } from "@/config/settings.config"
import { searchQuery } from "@/lib/shopify/queries/search"
import { storefront } from "@/lib/shopify/storefront"
import type { Product, SearchQuery, Variables } from "@/lib/shopify/types"

export async function getProductsBySearch(variables: Variables = {}): Promise<Product[]> {
    try {
        const { 
            data: { 
                search: { 
                    nodes: products 
                }
            } 
        } = await storefront<SearchQuery>({
            query: searchQuery,
            variables,
            revalidate: 7200
        })
    
        return products
    } catch (error) {
        if (isDev) {
            console.error("SEARCH ERROR: ", error)
        }

        if (error instanceof Error) {
            throw new Error(`SEARCH ERROR: ${error.message}`)
        }

        return []
    }
}