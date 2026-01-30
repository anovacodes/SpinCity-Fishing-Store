"use server"

import { isDev } from "@/config/settings.config"
import { billboardQuery } from "@/lib/shopify/queries/billboard"
import { storefront } from "@/lib/shopify/storefront"
import type { Article, BillboardQuery } from "@/lib/shopify/types"

export async function getBillboards(handle: string): Promise<Article[]> {
    try {
        const { 
            data: { 
                blog: { 
                    articles: { 
                        nodes 
                    }
                } 
            } 
        } = await storefront<BillboardQuery>({
            query: billboardQuery,
            variables: { handle },
            revalidate: 7200
        })
    
        return nodes
    } catch (error) {
        if (error instanceof Error && isDev) {
            console.error("GET BILLBOARDS ERROR: ", error.message)
        }

        return []
    }
}