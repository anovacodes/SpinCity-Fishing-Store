import { getProductsFromCollection } from "@/actions/shopify/getProductsFromCollection"
import { productsFromCollectionQuery } from "@/lib/shopify/queries/products"
import ProductsSlider from "./ProductsSlider"
import { getReviewsSummary } from "@/actions/prisma/getReviewsSummary"
import type { CurrentUser } from "@/actions/auth/getCurrentUser"
import type { Variables } from "@/lib/shopify/types"
import type { FC } from "react"
import Section from "../Section"
import { cn } from "@/utils/utils"

export type ReviewsSummary = {
    productHandle: string
    rating: number
    count: number
}

interface ProductsSliderWrapperProps {
    title: string
    currentUser?: CurrentUser
    variables: Variables
    className?: string
}

const ProductsSliderWrapper: FC<ProductsSliderWrapperProps> = async ({ title, currentUser, variables, className }) => {
    const products = await getProductsFromCollection(productsFromCollectionQuery, variables)
    const reviewsSummary = await getReviewsSummary(products)

    return (
        <Section title={title} className={cn("products-slider", className)}>
            <ProductsSlider
                title={title}
                products={products}
                currentUser={currentUser}
                reviewsSummary={reviewsSummary}
            />
        </Section>
    )
}

export default ProductsSliderWrapper
