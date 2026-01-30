"use server"

import { ReviewSchema } from "@/lib/zod/types"
import getCurrentUser from "../auth/getCurrentUser"
import prisma from "@/lib/prisma/prismadb"
import { revalidateTag } from "@/utils/cache"
import { isDev, STORE_SETTINGS } from "@/config/settings.config"
import { Ratelimit } from "@upstash/ratelimit"
import { redis } from "@/lib/redis/redis"
import { rateLimiter } from "@/utils/redis"
import { headers } from "next/headers"

const { tokens, window } = STORE_SETTINGS.rateLimit

const rateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(tokens, window)
})

export const addReview = async (data: ReviewSchema) => {
    try {
        await rateLimiter({ headers: headers(), rateLimit })

        if (STORE_SETTINGS.commentsFormStatus === "disabled") {
            throw new Error("Reviews section is temporarily disabled")
        }

        if (!data.productHandle) {
            throw new Error("Something went wrong")
        }

        const currentUser = await getCurrentUser()

        if (!currentUser) {
            throw new Error("Not authorized")
        }

        await prisma.product.upsert({
            where: {
                productHandle: data.productHandle
            },
            update: {
                reviews: {
                    create: [
                        {
                            name: data.name,
                            message: data.message,
                            rating: data.rating
                        }
                    ]
                }
            },
            create: {
                productHandle: data.productHandle,
                reviews: {
                    create: [
                        {
                            name: data.name,
                            message: data.message,
                            rating: data.rating
                        }
                    ]
                }
            }
        })
    } catch (error) {
        if (isDev) {
            console.error("ADD REVIEW ERROR: ", error)
        }

        if (error instanceof Error) {
            throw new Error(error.message)
        }
    } finally {
        revalidateTag("reviews")
    }
}
