"use server"

import prisma from "@/lib/prisma/prismadb"
import { getRelatedCartId } from "./getRelatedCartId"
import { isDev } from "@/config/settings.config"

export const registerCart = async (cartId: string, currentUserId: string) => {
    try {
        if (!cartId) {
            throw new Error("No cart id provided")
        }

        const exists = await getRelatedCartId(currentUserId)

        if (exists) return

        const data = await prisma.cart.create({
            data: {
                ownerId: currentUserId,
                cartId
            }
        })

        return data
    } catch (error) {
        if (isDev) {
            console.error("REGISTER CART IN PRISMA ERROR: ", error)
        }
        
        if (error instanceof Error) {
            throw new Error(error.message)
        }
    } 
}