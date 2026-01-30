"use server"

import { isDev } from "@/config/settings.config"
import { pageQuery } from "@/lib/shopify/queries/page"
import { storefront } from "@/lib/shopify/storefront"
import type { Page, PageQuery} from "@/lib/shopify/types"

export async function getPage(slug: string = ""): Promise<Page | null> {
    try {
        const { data: { page } } = await storefront<PageQuery>({
            query: pageQuery,
            variables: { handle: slug }
        })

        if (!page) {
            throw new Error("Page not found")
        }
    
        return page
    } catch (error) {
        if (error instanceof Error && isDev) {
            console.error("GET PAGE ERROR: ", error.message)
        }

        return null
    }
}