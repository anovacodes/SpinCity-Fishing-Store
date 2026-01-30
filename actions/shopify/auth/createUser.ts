"use server"

import { isDev } from "@/config/settings.config"
import { signIn } from "@/lib/auth/auth"
import { customerCreateMutation } from "@/lib/shopify/mutations/customer"
import { storefront } from "@/lib/shopify/storefront"
import type { CustomerCreatePayload, CustomerCreateQuery } from "@/lib/shopify/types"
import { customerCreateVariables } from "@/lib/shopify/variables"
import { signUpSchema } from "@/lib/zod/schema"
import type { SignUpSchema } from "@/lib/zod/types"
import { validateAndOmitField } from "@/utils/zod"

export const createUser = async (data: SignUpSchema): Promise<CustomerCreatePayload | undefined> => {
    try {
        const clientData = validateAndOmitField(data, signUpSchema, "confirmPassword")

        if (!clientData) {
            throw new Error("Something went wrong")
        }

        const {
            data: {
                customerCreate: {
                    customer,
                    customerUserErrors
                }
            }
        } = await storefront<CustomerCreateQuery>({ 
            query: customerCreateMutation, 
            variables: customerCreateVariables(clientData), 
            revalidate: 0
        })
        
        if (!customer || customerUserErrors.length) {
            throw new Error(customerUserErrors[0].message)
        }

        await signIn("credentials", {
            email: clientData.email,
            password: clientData.password,
            redirect: false
        })

        return {
            customer,
            customerUserErrors
        }
    } catch (error) {
        if (isDev) {
            console.error("CREATE USER ERROR: ", error)
        }

        if (error instanceof Error) {
            throw new Error(error.message)
        }
    }
}