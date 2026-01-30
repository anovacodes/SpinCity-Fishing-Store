"use server"

import { cache } from "@/utils/cache"
import prisma from "@/lib/prisma/prismadb"
import type { Wishlist } from "@prisma/client"
import { isDev } from "@/config/settings.config"

export const getWishlistByUserId = cache(
    async (id: string): Promise<Wishlist | null> => {
        try {
            const wishlist: Wishlist | null = await prisma.wishlist.findUnique({
                where: {
                    ownerId: id
                }
            })
    
            if (!wishlist) {
                throw new Error("Unable to find a wishlist.")
            }
            
            return wishlist
        } catch (error) {
            if (error instanceof Error && isDev) {
                console.error("GET WISHLIST BY USER ID FROM PRISMA ERROR: ", error.message)
            }
    
            return null
        }
    }, 
    {
        tags: ["wishlist"],
        revalidate: 300
    }
)