import "server-only"

import { envVariables } from "@/config/env.config"
import type { Variables } from "./types"
import { isDev } from "@/config/settings.config"

interface StorefrontOptions {
    query: string
    variables?: Variables
    revalidate?: number
}

export async function storefront<T>({ query, variables = {}, revalidate = 3600 }: StorefrontOptions): Promise<T> {
    try {
        const response = await fetch(envVariables.STOREFRONT_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Shopify-Storefront-Access-Token": envVariables.STOREFRONT_ACCESS_TOKEN
            },
            body: JSON.stringify({ query, variables }),
            next: {
                revalidate
            }
        })
    
        const data = await response.json()

        if (!data || Array.isArray(data.errors) && data.errors.length) {
            if (isDev) {
                console.error("STOREFRONT API ERROR: ", data.errors)
            }
            
            throw new Error("Storefront API error. Please try again later.")
        }

        return data as T
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }

        throw error
    }
}

