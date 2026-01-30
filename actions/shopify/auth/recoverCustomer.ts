"use server"

import { customerRecoverMutation } from "@/lib/shopify/mutations/customer"
import { storefront } from "@/lib/shopify/storefront"
import { customerRecoverVariables } from "@/lib/shopify/variables"
import { recoverUserSchema } from "@/lib/zod/schema"
import type { CustomerRecoverQuery } from "@/lib/shopify/types"
import type { RecoverUserSchema } from "@/lib/zod/types"
import { isDev } from "@/config/settings.config"

export const recoverCustomer = async (data: RecoverUserSchema) => {
    try {
        const parsedData = recoverUserSchema.safeParse(data)

        if (!parsedData.success) {
            throw new Error("Invalid email.")
        }

        const {
            data: {
                customerRecover: {
                    customerUserErrors
                }
            }
        } = await storefront<CustomerRecoverQuery>({
            query: customerRecoverMutation,
            variables: customerRecoverVariables(parsedData.data.email),
            revalidate: 0
        })

        if (customerUserErrors && customerUserErrors.length) {
            throw new Error(customerUserErrors[0].message)
        }
    } catch (error) {
        if (isDev) {
            console.error("RECOVER USER ERROR: ", error)
        }
        
        if (error instanceof Error) {
            throw new Error(error.message)
        }
    } 
}