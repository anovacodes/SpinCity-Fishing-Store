"use server"

import prisma from "@/lib/prisma/prismadb"
import getCurrentUser from "../auth/getCurrentUser"
import type { Wishlist } from "@prisma/client"
import { unstable_update } from "@/lib/auth/auth"
import { revalidateTag } from "@/utils/cache"
import { headers } from "next/headers"
import { rateLimiter } from "@/utils/redis"
import { isDev, STORE_SETTINGS } from "@/config/settings.config"
import { Ratelimit } from "@upstash/ratelimit"
import { redis } from "@/lib/redis/redis"

const { tokens, window } = STORE_SETTINGS.rateLimit

const rateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(tokens, window)
})

export const addProductToWishlist = async (handle: string) => {
    try {
        await rateLimiter({ headers: headers(), rateLimit })

        const currentUser = await getCurrentUser()

        if (!currentUser) {
            throw new Error("Not authorized")
        }

        const wishlist: Wishlist = await prisma.wishlist.upsert({
            where: {
                ownerId: currentUser.id
            },
            update: {
                productHandles: {
                    push: handle
                }
            },
            create: {
                ownerId: currentUser.id,
                productHandles: [handle]
            }
        })

        await unstable_update({
            user: {
                ...currentUser,
                wishlist
            }
        })

        return wishlist
    } catch (error) {
        if (isDev) {
            console.error("ADD PRODUCT TO WISHLIST ERROR: ", error)
        }

        if (error instanceof Error) {
            throw new Error(error.message)
        }
    } finally {
        revalidateTag("wishlist")
    }
}
