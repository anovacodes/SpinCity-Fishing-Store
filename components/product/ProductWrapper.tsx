import { getProduct } from "@/actions/shopify/getProduct"
import Product from "./Product"
import { getProductRecommendations } from "@/actions/shopify/getProductRecommendations"
import getCurrentUser from "@/actions/auth/getCurrentUser"
import { getReviews } from "@/actions/prisma/getReviews"
import { getReviewsSummary } from "@/actions/prisma/getReviewsSummary"
import type { FC } from "react"
import { notFound } from "next/navigation"

interface ProductWrapperProps {
    slug: string
}

const ProductWrapper: FC<ProductWrapperProps> = async ({ slug }) => {
    const product = await getProduct(slug)

    if (!product) {
        notFound()
    }

    const [currentUser, productRecommendations, reviews] = await Promise.all([
        getCurrentUser(),
        getProductRecommendations(product.id),
        getReviews(slug)
    ])

    const reviewsSummary = await getReviewsSummary(productRecommendations)

    return (
        <Product
            product={product}
            productRecommendations={productRecommendations}
            currentUser={currentUser}
            reviews={reviews}
            reviewsSummary={reviewsSummary}
        />
    )
}

export default ProductWrapper
