import "server-only"

import type { CustomerWithEncryptedAccessToken } from "@/lib/shopify/types"
import type { User } from "next-auth"
import { auth } from "@/lib/auth/auth"
import { isDev } from "@/config/settings.config"
import { checkIfSessionExpired } from "@/utils/checkIfSessionExpired"

export type CurrentUser = CustomerWithEncryptedAccessToken & User | null

export async function getSession() {
    return await auth()
}

export default async function getCurrentUser(): Promise<CurrentUser> {
    try {
        const session = await getSession()

        if (!session?.user) return null

        session.expires

        const { user, expires } = session

        const expiresAtTimestamp = new Date(expires).getTime()

        user.sessionExpired = checkIfSessionExpired(expiresAtTimestamp)

        return user
    } catch (error) {
        if (error instanceof Error && isDev) {
            console.error("GET CURRENT USER ERROR: ", error)
        }

        return null
    }
}
