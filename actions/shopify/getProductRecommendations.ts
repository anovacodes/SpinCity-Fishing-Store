"use server"

import { isDev } from "@/config/settings.config"
import { productRecommendations } from "@/lib/shopify/queries/products"
import { storefront } from "@/lib/shopify/storefront"
import type { ProductRecommendationsQuery, ProductsEdge } from "@/lib/shopify/types"
import { productRecommendationsVariables } from "@/lib/shopify/variables"

export const getProductRecommendations = async (productId: string): Promise<ProductsEdge[]> => {
    try {
        const { 
            data: { 
                productRecommendations: products
            } 
        } = await storefront<ProductRecommendationsQuery>({
            query: productRecommendations,
            variables: productRecommendationsVariables(productId),
            revalidate: 7200
        })
    
        const fakeProductEdges = products.map(product => {
            return {
                cursor: "",
                node: product
            }
        }) 
    
        return fakeProductEdges
    } catch (error) {
        if (error instanceof Error && isDev) {
            console.error("GET PRODUCT RECOMMENDATIONS ERROR: ", error.message)
        }

        return []
    }
}