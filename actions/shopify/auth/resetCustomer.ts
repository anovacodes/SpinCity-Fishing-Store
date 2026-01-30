"use server"

import { customerResetMutation } from "@/lib/shopify/mutations/customer"
import { storefront } from "@/lib/shopify/storefront"
import { customerResetVariables } from "@/lib/shopify/variables"
import { resetUserSchema } from "@/lib/zod/schema"
import type { CustomerResetQuery } from "@/lib/shopify/types"
import type { ResetUserSchema } from "@/lib/zod/types"
import { revalidateTag } from "@/utils/cache"
import { validateAndOmitField } from "@/utils/zod"
import { redirect } from "next/navigation"
import { isDev } from "@/config/settings.config"

export const resetCustomer = async (userId: string, input: ResetUserSchema) => {
    try {
        const clientData = validateAndOmitField(input, resetUserSchema, "confirmPassword")

        if (!userId || !clientData) {
            throw new Error("Something went wrong.")
        } 

        const {
            data: {
                customerReset: {
                    customerUserErrors
                }
            }
        } = await storefront<CustomerResetQuery>({
            query: customerResetMutation,
            variables: customerResetVariables(userId, clientData),
            revalidate: 0
        })

        if (customerUserErrors && customerUserErrors.length) {
            throw new Error(customerUserErrors[0].message)
        }
    } catch (error) {
        if (isDev) {
            console.error("RESET USER ERROR: ", error)
        }

        if (error instanceof Error) {
            throw new Error(error.message)
        }
    } finally {
        revalidateTag("wishlist")
        redirect("/auth/sign-in?action=recover")
    }
}