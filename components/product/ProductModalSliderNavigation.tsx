"use client"

import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { useSwiper } from "swiper/react"

const ProductModalSliderNavigation = () => {
    const swiper = useSwiper()

    return (
        <div className="hidden md:block">
            <button
                className="
                    group
                    absolute 
                    top-0
                    bottom-0
                    left-0 
                    z-10 
                    w-50
                    flex
                    flex-col
                    justify-center
                    items-start
                    text-neutral-100
                "
                onClick={(event) => {
                    event.stopPropagation()
                    swiper.slidePrev()
                }}
            >
                <span className="opacity-20 group-hover:opacity-100 transition-opacity">
                    <FiChevronLeft size={75} />
                </span>
            </button>

            <button
                className="
                    group
                    absolute 
                    top-0
                    bottom-0
                    right-0 
                    z-10 
                    w-50
                    flex
                    flex-col
                    justify-center
                    items-start
                    text-neutral-100
                "
                onClick={(event) => {
                    event.stopPropagation()
                    swiper.slideNext()
                }}
            >
                <span className="opacity-20 group-hover:opacity-100 transition-opacity">
                    <FiChevronRight size={75} />
                </span>
            </button>
        </div>
    )
}
 
export default ProductModalSliderNavigation