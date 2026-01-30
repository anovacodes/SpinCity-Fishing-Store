"use server"

import { isDev } from "@/config/settings.config"
import { storefront } from "@/lib/shopify/storefront"
import type { MenuItem, MenuItemQuery, Variables } from "@/lib/shopify/types"

export async function getMenu(query: string, variables: Variables = {}): Promise<MenuItem[]> {
    try {
        const { data: { menu } } = await storefront<MenuItemQuery>({ query, variables })
        
        return menu.items
    } catch (error) {
        if (error instanceof Error && isDev) {
            console.error("GET MENU ERROR: ", error.message)
        }

        return []
    }
}