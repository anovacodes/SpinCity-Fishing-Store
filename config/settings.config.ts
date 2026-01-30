import type { Duration } from "@upstash/ratelimit"

export type Status = "disabled" | "enabled"

export type CommentsFormStatus = Status
export type CheckoutPossibilityStatus = Status

export type RateLimit = {
    tokens: number
    window: Duration
}

interface StoreSettings {
    commentsFormStatus: CommentsFormStatus
    checkoutPossibilityStatus: CheckoutPossibilityStatus
    productSearchCount: number
    productsFromCollectionCount: number
    blogListCount: number
    blogPreviewListCount: number
    bestSellingCount: number
    reelsSliderCount: number
    lineSliderCount: number
    notificationVisibilityTime: number
    rateLimit: RateLimit
}

interface SitemapLimits {
    productHandlesCount: number
    articlesHandlesCount: number
}

export const isDev = process.env.NODE_ENV === "development"

export const baseUrl: string = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://localhost:3000"

export const STORE_SETTINGS: StoreSettings = {
    commentsFormStatus: "disabled",
    checkoutPossibilityStatus: "disabled",
    productSearchCount: 3,
    productsFromCollectionCount: 10,
    blogListCount: 6,
    blogPreviewListCount: 3,
    bestSellingCount: 5,
    reelsSliderCount: 12,
    lineSliderCount: 12,
    notificationVisibilityTime: 3000,
    rateLimit: {
        tokens: 3,
        window: "10s"
    }
}

export const SITEMAP_LIMITS: SitemapLimits = {
    productHandlesCount: 250,
    articlesHandlesCount: 250
}
