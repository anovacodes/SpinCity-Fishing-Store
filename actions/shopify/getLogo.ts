"use server"

import { isDev } from "@/config/settings.config"
import { logoQuery } from "@/lib/shopify/queries/shop"
import { storefront } from "@/lib/shopify/storefront"
import type { ImageT, LogoQuery } from "@/lib/shopify/types"

export async function getLogo(): Promise<ImageT | null> {
    try {
        const { 
            data: {
                shop: {
                    brand: {
                        logo: {
                            image
                        }
                    }
                }
            }
         } = await storefront<LogoQuery>({ query: logoQuery })

        return image
    } catch (error) {
        if (error instanceof Error && isDev) {
            console.error("LOAD LOGO ERROR: ", error.message)
        }

        return null
    }
}