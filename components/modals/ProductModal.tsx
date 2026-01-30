"use client"

import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"

import { useProductModal } from "@/hooks/useProductModal"
import Modal from "./Modal"
import placeholder from "@/public/placeholder.jpg"
import Image from "next/image"
import ProductModalSliderNavigation from "../product/ProductModalSliderNavigation"

const ProductModal = () => {
    const { isOpen, images, initialSlide, onClose } = useProductModal()

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Swiper className="h-full" initialSlide={initialSlide}>
                {images.map((image) => {
                    return (
                        <SwiperSlide key={image.url} className="h-full select-none">
                            <Image
                                className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] max-h-[90%] max-w-[80%] w-auto rounded-xl bg-white"
                                height={image.height}
                                width={image.width}
                                src={image.url ?? placeholder}
                                alt={image.altText ?? "Some description"}
                                onClick={(event) => event.stopPropagation()}
                            />
                        </SwiperSlide>
                    )
                })}
                <ProductModalSliderNavigation />
            </Swiper>
        </Modal>
    )
}

export default ProductModal
