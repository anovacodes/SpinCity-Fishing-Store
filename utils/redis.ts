import "server-only"

import type { RateLimiterOptions } from "@/lib/redis/types"
import type { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers"

export const getIpAddress = (headers: ReadonlyHeaders) => {
    const ip = headers.get("x-forwarded-for")

    return ip
}

export const rateLimiter = async ({ headers, rateLimit }: RateLimiterOptions) => {
    const ip = getIpAddress(headers)

    if (!ip) {
        throw new Error("Something went wrong.")
    }

    const { success } = await rateLimit.limit(ip)

    if (!success) {
        throw new Error("Rate limit has been reached. Please try again later.")
    }
}
