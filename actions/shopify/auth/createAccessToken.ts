"use server"

import { customerAccessTokenCreateMutation } from "@/lib/shopify/mutations/customer"
import { storefront } from "@/lib/shopify/storefront"
import { customerAccessTokenCreateVariables } from "@/lib/shopify/variables"
import type { CustomerAccessTokenCreateQuery } from "@/lib/shopify/types"
import type { SignInSchema } from "@/lib/zod/types"
import { isDev } from "@/config/settings.config"

export const createAccessToken = async (data: SignInSchema) => {
    try {
        const {
            data: {
                customerAccessTokenCreate: {
                    customerAccessToken,
                    customerUserErrors
                }
            }
        } = await storefront<CustomerAccessTokenCreateQuery>({
            query: customerAccessTokenCreateMutation,
            variables: customerAccessTokenCreateVariables(data),
            revalidate: 0
        })
 
        return {
            customerAccessToken,
            customerUserErrors
        }
    } catch (error) {
        if (isDev) {
            console.error("CREATE ACCESS TOKEN ERROR: ", error)
        }

        if (error instanceof Error) {
            throw new Error(error.message)
        }

        throw new Error("Create access token error")
    }
}