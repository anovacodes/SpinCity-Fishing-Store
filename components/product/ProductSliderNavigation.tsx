"use client"

import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { useSwiper } from "swiper/react"

const ProductSliderNavigation = () => {
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
                    w-24
                    bg-gradient-to-r
                    from-white
                    to-[rgba(0, 0, 0, 0)]
                    flex
                    flex-col
                    justify-center
                    items-start
                    text-neutral-400
                    opacity-0
                    hover:opacity-100
                    transition-opacity
                "
                onClick={() => swiper.slidePrev()}
            >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <FiChevronLeft size={45} />
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
                    w-24
                    bg-gradient-to-l
                    from-white
                    to-[rgba(0, 0, 0, 0)]
                    flex
                    flex-col
                    justify-center
                    items-end
                    text-neutral-400
                    opacity-0
                    hover:opacity-100
                    transition-opacity
                "
                onClick={() => swiper.slideNext()}
            >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <FiChevronRight size={45} />
                </span>
            </button>
        </div>
    )
}
 
export default ProductSliderNavigation