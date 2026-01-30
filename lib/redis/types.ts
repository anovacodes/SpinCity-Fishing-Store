import { Ratelimit } from "@upstash/ratelimit"
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers"

export type RateLimiterOptions = {
    headers: ReadonlyHeaders
    rateLimit: Ratelimit
}