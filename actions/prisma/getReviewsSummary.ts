"use server"

import { ReviewsSummary } from "@/components/product/ProductsSliderWrapper"
import { Review } from "@prisma/client"
import { getReviews } from "./getReviews"
import { ProductsEdge } from "@/lib/shopify/types"
import { cache } from "@/utils/cache"
import { isDev } from "@/config/settings.config"

export const getReviewsSummary = cache(
    async (products: ProductsEdge[]) => {
        try {
            const requests = products.map((product) => getReviews(product.node.handle))
    
            const reviews: Array<Review[] | []> = await Promise.all(requests)
    
            const ignoreEmptyProductReviewsArrays: Array<Review[]> = reviews.filter((review) => {
                return Array.isArray(review) && review.length > 0
            })
    
            const reviewsSummary: Array<ReviewsSummary> =
                ignoreEmptyProductReviewsArrays.map((review) => {
                    const sumOfRatings = review.reduce(
                        (total, item) => total + item.rating,
                        0
                    )
    
                    let notZeroRatingReviewsCount = review.reduce((total, item) => {
                        if (item.rating > 0) {
                            return total + 1
                        }
    
                        return total + 0
                    }, 0)
    
                    if (notZeroRatingReviewsCount === 0) {
                        notZeroRatingReviewsCount = 1
                    }
    
                    const rating = Math.round(
                        sumOfRatings / notZeroRatingReviewsCount
                    )
    
                    return {
                        productHandle: review[0].productHandle,
                        rating,
                        count: review.length
                    }
                })
    
            return reviewsSummary
        } catch (error) {
            if (error instanceof Error && isDev) {
                console.error("GET REVIEWS SUMMARY ERROR: ", error.message)
            }
    
            return []
        }
    },
    {
        tags: ["reviews"],
        revalidate: 300
    }
)

