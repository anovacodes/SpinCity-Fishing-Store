"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"

import "swiper/css"
import "swiper/css/pagination"

import ProductCard from "./ProductCard"
import type { ProductsEdge } from "@/lib/shopify/types"
import ProductsSliderNavigation from "./ProductsSliderNavigation"
import { CurrentUser } from "@/actions/auth/getCurrentUser"
import { ReviewsSummary } from "./ProductsSliderWrapper"
import { FC, useEffect, useState } from "react"

interface ProductsSliderProps {
    title: string
    products: ProductsEdge[]
    currentUser?: CurrentUser
    reviewsSummary: Array<ReviewsSummary>
}

const ProductsSlider: FC<ProductsSliderProps> = ({ title, products = [], currentUser, reviewsSummary = [] }) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    return (
        <Swiper
            modules={[Pagination]}
            slidesPerView={1}
            spaceBetween={30}
            pagination={{
                clickable: true
            }}
            breakpoints={{
                1280: {
                    slidesPerView: 5
                },
                1024: {
                    slidesPerView: 4
                },
                768: {
                    slidesPerView: 3
                },
                640: {
                    slidesPerView: 2
                }
            }}
        >
            {products.map((product) => {
                const summary = reviewsSummary?.find((review) => review?.productHandle === product.node.handle)

                return (
                    <SwiperSlide
                        className={`
                            pb-10
                            ${!isMounted ? "sm:max-w-[47.919556%] md:max-w-[31.2255005%] lg:max-w-[23.06867%] xl:max-w-[18.44156%] mr-[30px]" : ""}
                        `}
                        key={product.node.id}
                    >
                        <ProductCard
                            product={product}
                            sectionType={title}
                            currentUser={currentUser}
                            reviewsSummary={summary}
                        />
                    </SwiperSlide>
                )
            })}
            <ProductsSliderNavigation />
        </Swiper>
    )
}

export default ProductsSlider
