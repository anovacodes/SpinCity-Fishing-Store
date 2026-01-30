"use server"

import { isDev } from "@/config/settings.config"
import { storefront } from "@/lib/shopify/storefront"
import type { ArticleEdge, ArticlesQuery, Variables } from "@/lib/shopify/types"

export const getArticles = async (query: string, variables: Variables = {}): Promise<ArticleEdge[]> => {
    try {
        const {
            data: {
                blog: {
                    articles: {
                        edges
                    }
                }
            }
        } = await storefront<ArticlesQuery>({ query, variables, revalidate: 7200 })
    
        return edges
    } catch (error) {
        if (error instanceof Error && isDev) {
            console.error("GET ARTICLES ERROR: ", error.message)
        }

        return []
    }
}