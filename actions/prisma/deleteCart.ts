"use server"

import prisma from "@/lib/prisma/prismadb"
import { getRelatedCartId } from "./getRelatedCartId"
import { isDev } from "@/config/settings.config"

export const deleteCart = async (cartId: string, currentUserId: string) => {
    try {
        if (!cartId) {
            throw new Error("No cart id provided")
        }

        if (!currentUserId) {
            throw new Error("Unauthorized")
        }

        const exists = await getRelatedCartId(currentUserId)

        if (!exists) return

        await prisma.cart.delete({
            where: {
                ownerId: currentUserId,
                cartId: cartId
            }
        })
    } catch (error) {
        if (isDev) {
            console.error("DELETE CART FROM PRISMA ERROR: ", error)
        }

        if (error instanceof Error) {
            throw new Error(error.message)
        }
    } 
}