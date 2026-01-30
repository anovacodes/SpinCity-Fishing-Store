"use server"

import jwt from "jsonwebtoken"
import type { CurrentUser } from "@/actions/auth/getCurrentUser"
import type { Customer, DecryptedCustomerAccessToken } from "@/lib/shopify/types"
import { envVariables } from "@/config/env.config"
import { getCustomer } from "./getCustomer"
import { isDev } from "@/config/settings.config"

export const reReceiveCustomer = async (currentUser: CurrentUser): Promise<Customer | null> => {
    try {
        if (!currentUser) {
            throw new Error("Unauthorized")
        }

        const decryptedCustomerAccessToken: DecryptedCustomerAccessToken = jwt.verify(
            currentUser.encryptedCustomerAccessToken!,
            envVariables.JWT_SECRET
        )

        if (typeof decryptedCustomerAccessToken === "string") {
            throw new Error("Verification failed.")
        }

        const customerAccessToken: string = decryptedCustomerAccessToken.customerAccessToken.accessToken

        const customer: Customer | null = await getCustomer(customerAccessToken)

        return customer
    } catch (error) {
        if (isDev) {
            console.error("RE RECEIVE USER ERROR: ", error)
        }

        if (error instanceof Error) {
            throw new Error(error.message)
        }

        return null
    }
}
