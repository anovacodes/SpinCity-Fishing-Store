"use client"

import { Pagination, Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

import { Article } from "@/lib/shopify/types"
import Container from "./Container"
import Image from "next/image"
import Link from "next/link"
import HeroSwiperNavigation from "./HeroSwiperNavigation"
import placeholder from "@/public/placeholder.jpg"
import { FC, useEffect, useState } from "react"
import { useResize } from "@/hooks/useResize"

interface HeroProps {
    billboards: Article[]
}

const Hero: FC<HeroProps> = ({ billboards = [] }) => {
    const { width } = useResize()
    const [isMounted, setIsMounted] = useState(false)

    const isMobile = width <= 768

    useEffect(() => {
        setIsMounted(true)
    }, [])

    return (
        <div className="hero">
            <Container>
                <Swiper
                    className={`
                        ${isMounted ? "h-auto" : "h-[500px] sm:h-[820px] md:h-[312px] lg:h-[375px] xl:h-[605px]"}
                        group 
                        bg-neutral-100
                        text-2xl    
                    `}
                    modules={[Pagination, Autoplay]}
                    loop
                    autoplay={{
                        delay: 5000
                    }}
                    pagination={{
                        dynamicBullets: true,
                        clickable: true
                    }}
                >
                    {billboards.map((billboard) => {
                        const isDesktopContent = billboard.content === "desktop"

                        if ((!isMobile && !isDesktopContent) || (isMobile && isDesktopContent)) {
                            return null
                        }

                        return (
                            <SwiperSlide key={billboard.id}>
                                <Link
                                    className={`
                                        block 
                                        ${isDesktopContent ? "hidden md:block" : "block md:hidden"}
                                    `}
                                    href={billboard.title}
                                >
                                    <Image
                                        width={billboard.image?.width}
                                        height={billboard.image?.height}
                                        src={billboard.image?.url ?? placeholder}
                                        alt={billboard.image?.altText ?? billboard.title}
                                        priority={true}
                                    />
                                </Link>
                            </SwiperSlide>
                        )
                    })}

                    <div className="hidden group-hover:block">
                        <HeroSwiperNavigation />
                    </div>
                </Swiper>
            </Container>
        </div>
    )
}

export default Hero
