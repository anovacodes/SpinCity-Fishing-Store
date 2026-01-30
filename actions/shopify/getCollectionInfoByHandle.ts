"use server"

import { isDev } from "@/config/settings.config"
import { collectionInfoByHandleQuery } from "@/lib/shopify/queries/collection"
import { storefront } from "@/lib/shopify/storefront"
import type { CollectionInfoByHandleQuery, ProductCollectionInfo } from "@/lib/shopify/types"
import { collectionInfoVariables } from "@/lib/shopify/variables"

export async function getCollectionInfoByHandle(handle: string = ""): Promise<ProductCollectionInfo | null> {
    try {
        const { 
            data: {
                collection
            }
        } = await storefront<CollectionInfoByHandleQuery>({
            query: collectionInfoByHandleQuery,
            variables: collectionInfoVariables(handle),
            revalidate: 7200
        })

        return collection
    } catch (error) {
        if (error instanceof Error && isDev) {
            console.error("Failed to load collection info: ", error.message)
        }

        return null
    }
}