"use server"

import { isDev } from "@/config/settings.config"
import { shopInfoQuery } from "@/lib/shopify/queries/shop"
import { storefront } from "@/lib/shopify/storefront"
import type { ShopInfo, ShopInfoQuery } from "@/lib/shopify/types"

export async function getShopInfo(): Promise<ShopInfo | null> {
    try {
        const { 
            data: {
                shop
            }
        } = await storefront<ShopInfoQuery>({
            query: shopInfoQuery,
            variables: {},
            revalidate: 14400
        })

        return shop
    } catch (error) {
        if (error instanceof Error && isDev) {
            console.error("Failed to load store information: ", error.message)
        }

        return null
    }
}