"use server"

import prisma from "@/lib/prisma/prismadb"
import getCurrentUser from "../auth/getCurrentUser"
import { Wishlist } from "@prisma/client"
import { unstable_update } from "@/lib/auth/auth"
import { getWishlistByUserId } from "./getWishlistByUserId"
import { revalidateTag } from "@/utils/cache"
import { headers } from "next/headers"
import { redis } from "@/lib/redis/redis"
import { Ratelimit } from "@upstash/ratelimit"
import { isDev, STORE_SETTINGS } from "@/config/settings.config"
import { rateLimiter } from "@/utils/redis"

const { tokens, window } = STORE_SETTINGS.rateLimit

const rateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(tokens, window)
})

export const removeProductFromWishlist = async (handle: string) => {
    try {
        await rateLimiter({ headers: headers(), rateLimit })

        const currentUser = await getCurrentUser()

        if (!currentUser) {
            throw new Error("Not authorized")
        }

        const wishlist: Wishlist | null = await getWishlistByUserId(currentUser.id)

        const updatedHandles = wishlist?.productHandles.filter(productHandle => productHandle !== handle)

        if (!updatedHandles?.length) {
            const deletedWishlist = await prisma.wishlist.delete({
                where: {
                    ownerId: currentUser.id
                }
            })

            await unstable_update({ 
                user: { 
                    ...currentUser,
                    wishlist: null
                }
            })

            return deletedWishlist
        } else {
            const wishlistAfterRemoving: Wishlist | null = await prisma.wishlist.update({
                where: {
                    ownerId: currentUser.id
                },
                data: {
                    productHandles: updatedHandles
                }
            })
    
            await unstable_update({ 
                user: { 
                    ...currentUser,
                    wishlist: wishlistAfterRemoving
                }
            })
            
            return wishlistAfterRemoving
        }
    } catch (error) {
        if (isDev) {
            console.error("REMOVE PRODUCT FROM WISHLIST ERROR: ", error)
        }
        
        if (error instanceof Error) {
            throw new Error(error.message)
        }
    } finally {
        revalidateTag("wishlist")
    }
} 