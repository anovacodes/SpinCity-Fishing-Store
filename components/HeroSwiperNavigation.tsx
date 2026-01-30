"use client"

import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { useSwiper } from "swiper/react"

const HeroSwiperNavigation = () => {
    const swiper = useSwiper()

    return (
        <div className="hidden md:block">
            <button
                className="absolute top-1/2 -translate-y-1/2 left-10 z-10 bg-white w-16 h-16 rounded-full text-neutral-600 flex items-center justify-center opacity-20 hover:opacity-80 transition-opacity"
                onClick={() => swiper.slidePrev()}
            >
                <FiChevronLeft size={60} className="-ml-1" />
            </button>
            <button
                className="absolute top-1/2 -translate-y-1/2 right-10 z-10 bg-white w-16 h-16 rounded-full text-neutral-600 flex items-center justify-center opacity-20 hover:opacity-80 transition-opacity"
                onClick={() => swiper.slideNext()}
            >
                <FiChevronRight size={60} className="-mr-1" />
            </button>
        </div>
    )
}
 
export default HeroSwiperNavigation