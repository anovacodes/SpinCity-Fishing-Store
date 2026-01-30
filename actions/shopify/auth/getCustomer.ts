"use server"

import { isDev } from "@/config/settings.config"
import { customerQuery } from "@/lib/shopify/queries/customer"
import { storefront } from "@/lib/shopify/storefront"
import type { Customer, CustomerQuery } from "@/lib/shopify/types"
import { customerVariables } from "@/lib/shopify/variables"

export const getCustomer = async (accessToken: string): Promise<Customer | null> => {
    try {
        const { data: { customer }} = await storefront<CustomerQuery>({
            query: customerQuery,
            variables: customerVariables(accessToken),
            revalidate: 0
        })

        return customer
    } catch (error) {
        if (isDev) {
            console.error("GET CUSTOMER ERROR: ", error)
        }
        
        if (error instanceof Error) {
            throw new Error(error.message)
        }

        return null
    }
}