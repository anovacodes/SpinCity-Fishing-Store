"use server"

import { isDev } from "@/config/settings.config"
import { locationsQuery } from "@/lib/shopify/queries/locations"
import { storefront } from "@/lib/shopify/storefront"
import type { Location, LocationsQuery } from "@/lib/shopify/types"

export const getLocations = async (): Promise<Location[]> => {
    try {
        const {
            data: {
                locations: {
                    nodes
                }
            }
        } = await storefront<LocationsQuery>({ query: locationsQuery })
    
        return nodes
    } catch (error) {
        if (error instanceof Error && isDev) {
            console.error("GET LOCATIONS ERROR: ", error.message)
        }

        return []
    }
}