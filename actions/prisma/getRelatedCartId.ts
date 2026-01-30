"use server"

import { isDev } from "@/config/settings.config"
import prisma from "@/lib/prisma/prismadb"

export const getRelatedCartId = async (currentUserId: string) => {
    try {
        if (!currentUserId) {
            throw new Error("Unauthorized")
        }

        const data = await prisma.cart.findUnique({
            where: {
                ownerId: currentUserId
            },
            select: {
                cartId: true
            }
        })

        if (!data) {
            return null
        }

        return data.cartId
    } catch (error) {
        if (error instanceof Error && isDev) {
            console.error("GET CART FROM PRISMA ERROR: ", error.message)
        }

        return null
    }
}