"use server"

import { isDev } from "@/config/settings.config"
import { articleQuery } from "@/lib/shopify/queries/articles"
import { storefront } from "@/lib/shopify/storefront"
import type { Article, ArticleByHandleQuery } from "@/lib/shopify/types"
import { articleVariables } from "@/lib/shopify/variables"

export const getArticle = async (blogHandle: string, slug: string): Promise<Article | null> => {
    try {
        const { 
            data: { 
                blog: { articleByHandle }
            } 
        } = await storefront<ArticleByHandleQuery>({
            query: articleQuery,
            variables: articleVariables(blogHandle, slug),
            revalidate: 7200
        })
    
        return articleByHandle
    } catch (error) {
        if (isDev) {
            console.error("GET ARTICLE ERROR: ", error)
        }

        if (error instanceof Error) {
            throw new Error(error.message)
        }

        return null
    }
}