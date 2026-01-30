"use server"

import { isDev } from "@/config/settings.config"
import { catalogQuery } from "@/lib/shopify/queries/catalog"
import { storefront } from "@/lib/shopify/storefront"
import type { CatalogItem, CatalogQuery } from "@/lib/shopify/types"

export async function getCatalog(): Promise<CatalogItem[]> {
    try {
        const { data: { menu } } = await storefront<CatalogQuery>({
            query: catalogQuery
        })

        return menu.items
    } catch (error) {
        if (error instanceof Error && isDev) {
            console.error("GET CATALOG ERROR: ", error.message)
        }

        return []
    }
}