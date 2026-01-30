"use client"

import type { Swiper as SwiperType } from "swiper/types"
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode, Thumbs } from "swiper/modules"

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/thumbs"

import type { ImageT } from "@/lib/shopify/types"
import Image from "next/image"
import placeholder from "@/public/placeholder.jpg"
import ProductSliderNavigation from "./ProductSliderNavigation"
import { FC, useEffect, useState } from "react"
import { useProductModal } from "@/hooks/useProductModal"

interface ProductSliderProps {
    images?: {
        nodes: ImageT[]
    }
}

const ProductSlider: FC<ProductSliderProps> = ({ images }) => {
    const [isMounted, setIsMounted] = useState(false)
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
    const { onOpen, setImages, setInitialSlide } = useProductModal()

    useEffect(() => {
        setImages(images?.nodes)
        setIsMounted(true)
    }, [setImages, images?.nodes])

    const handleClickOnFeaturedImage = (index: number) => {
        setInitialSlide(index)
        onOpen()
    }

    return (
        <div className="product-slider">
            {isMounted ? (
                <>
                    <Swiper
                        className="h-[400px] mb-[10px]"
                        thumbs={{
                            swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
                        }}
                        modules={[FreeMode, Thumbs]}
                    >
                        {images?.nodes.map((image, index) => {
                            return (
                                <SwiperSlide key={image.url} onClick={() => handleClickOnFeaturedImage(index)}>
                                    <Image
                                        className="object-contain h-full p-4 md:p-10 cursor-zoom-in"
                                        fill
                                        sizes="100%"
                                        src={image.url ?? placeholder}
                                        alt={image.altText ?? ""}
                                        priority={true}
                                    />
                                </SwiperSlide>
                            )
                        })}
                        <ProductSliderNavigation />
                    </Swiper>
                    <Swiper
                        className="h-[161.75px]"
                        onSwiper={setThumbsSwiper}
                        slidesPerView={2}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Thumbs]}
                        breakpoints={{
                            1024: {
                                slidesPerView: 4
                            },
                            768: {
                                slidesPerView: 3
                            }
                        }}
                    >
                        {images?.nodes.map((image) => {
                            return (
                                <SwiperSlide
                                    key={image.url}
                                    className={`
                                        aspect-square 
                                    `}
                                >
                                    <Image
                                        className="object-contain h-full p-4 cursor-pointer"
                                        fill
                                        sizes="100%"
                                        src={image.url ?? placeholder}
                                        alt={image.altText ?? ""}
                                        priority={true}
                                    />
                                </SwiperSlide>
                            )
                        })}
                        <ProductSliderNavigation />
                    </Swiper>
                </>
            ) : (
                <div>
                    <div className="bg-neutral-100 h-[400px] rounded-xl mb-[10px]"></div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[10px]">
                        <div className="bg-neutral-100 h-[161.75px] rounded-xl"></div>
                        <div className="bg-neutral-100 h-[161.75px] rounded-xl"></div>
                        <div className="bg-neutral-100 hidden md:block h-[161.75px] rounded-xl"></div>
                        <div className="bg-neutral-100 hidden lg:block h-[161.75px] rounded-xl"></div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductSlider
