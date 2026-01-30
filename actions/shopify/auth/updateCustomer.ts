"use server"

import jwt from "jsonwebtoken"
import getCurrentUser from "@/actions/auth/getCurrentUser"
import type { CustomerUpdateQuery, CustomerUpdateReturn, DecryptedCustomerAccessToken } from "@/lib/shopify/types"
import { updateUserSchema } from "@/lib/zod/schema"
import type { UpdateUserSchema } from "@/lib/zod/types"
import { validateAndOmitField } from "@/utils/zod"
import { envVariables } from "@/config/env.config"
import { storefront } from "@/lib/shopify/storefront"
import { customerUpdateMutation } from "@/lib/shopify/mutations/customer"
import { customerUpdateVariables } from "@/lib/shopify/variables"
import { unstable_update } from "@/lib/auth/auth"
import { isDev } from "@/config/settings.config"

export const updateCustomer = async (input: UpdateUserSchema): Promise<CustomerUpdateReturn | undefined> => {
    try {
        const clientData = validateAndOmitField(input, updateUserSchema, "confirmPassword")

        if (!clientData) {
            throw new Error("Something went wrong.")
        }

        const currentUser = await getCurrentUser()

        if (!currentUser) {
            throw new Error("Not authorized.")
        }

        const decryptedCustomerAccessToken: DecryptedCustomerAccessToken = jwt.verify(
            currentUser.encryptedCustomerAccessToken!,
            envVariables.JWT_SECRET
        )

        if (typeof decryptedCustomerAccessToken === "string") {
            throw new Error("Verification failed.")
        }

        const {
            data: { customerUpdate }
        } = await storefront<CustomerUpdateQuery>({
            query: customerUpdateMutation,
            variables: customerUpdateVariables(
                decryptedCustomerAccessToken.customerAccessToken.accessToken,
                clientData
            ),
            revalidate: 0
        })

        if (!customerUpdate || customerUpdate.customerUserErrors.length) {
            throw new Error(customerUpdate?.customerUserErrors[0].message)
        }

        const encryptedCustomerAccessToken = jwt.sign(
            { customerAccessToken: customerUpdate.customerAccessToken },
            envVariables.JWT_SECRET,
            { expiresIn: "30d" }
        )

        const updatedData = await unstable_update({
            user: {
                ...customerUpdate.customer,
                encryptedCustomerAccessToken,
                wishlist: currentUser.wishlist
            }
        })

        if (!updatedData) {
            throw new Error("Something went wrong.")
        }

        return {
            customer: customerUpdate.customer,
            encryptedCustomerAccessToken,
            customerUserErrors: customerUpdate.customerUserErrors
        }
    } catch (error) {
        if (isDev) {
            console.error("UPDATE USER ERROR: ", error)
        }

        if (error instanceof Error) {
            throw new Error(error.message)
        }
    }
}
