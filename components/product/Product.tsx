"use client"

import type { Product, ProductsEdge } from "@/lib/shopify/types"
import Container from "../Container"
import React, { FC } from "react"
import ProductsSlider from "./ProductsSlider"
import ProductSlider from "./ProductSlider"
import { CurrentUser } from "@/actions/auth/getCurrentUser"
import ReviewsForm from "../forms/ReviewsForm"
import Reviews from "../Reviews"
import { Review } from "@prisma/client"
import { ReviewsSummary } from "./ProductsSliderWrapper"
import Breadcrumbs, { Breadcrumb } from "../UI/Breadcrumbs"
import { usePathname } from "next/navigation"
import ProductDescription from "./ProductDescription"
import ProductSpecification from "./ProductSpecification"
import ProductInfo from "./ProductInfo"
import Section from "../Section"

interface ProductProps {
    product: Product
    productRecommendations: ProductsEdge[]
    currentUser?: CurrentUser
    reviews?: Review[]
    reviewsSummary: ReviewsSummary[]
}

const Product: FC<ProductProps> = ({
    product,
    productRecommendations = [],
    currentUser,
    reviews = [],
    reviewsSummary = []
}) => {
    const pathname = usePathname()

    const { title, availableForSale, images, options, metafields, variants, descriptionHtml } = product
    const bottomSliderTitle = "Related products"

    const collections = product.collections.nodes
        .filter((collection) => collection.handle !== "ultimate-search-do-not-delete")
        .sort((a, b) => b.products.nodes.length - a.products.nodes.length)

    const breadcrumbs: Array<Breadcrumb> = collections.map((collection) => ({
        href: `/collections/${collection.handle}`,
        label: collection.title
    }))

    return (
        <div>
            <Container>
                <Breadcrumbs items={[...breadcrumbs, { label: title, href: pathname }]} />

                <div className="grid grid-cols-1 lg:grid-cols-[42%_55%] justify-between gap-10 mb-20">
                    <ProductSlider images={images} />

                    <ProductInfo
                        title={title}
                        availableForSale={availableForSale}
                        options={options}
                        productVariantNodes={variants.nodes}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[42%_55%] justify-between gap-10">
                    <div>
                        <ProductDescription html={descriptionHtml} />

                        <ProductSpecification metafields={metafields} />
                    </div>

                    <div className="flex flex-col">
                        <ReviewsForm currentUser={currentUser} product={product} />

                        <Reviews reviews={reviews} />
                    </div>
                </div>
            </Container>

            <Section title={bottomSliderTitle} className="products-slider">
                <ProductsSlider
                    title={bottomSliderTitle}
                    products={productRecommendations}
                    currentUser={currentUser}
                    reviewsSummary={reviewsSummary}
                />
            </Section>
        </div>
    )
}

export default Product
