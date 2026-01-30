"use client"

import { FC, useCallback, useState } from "react"
import { FaFilter } from "react-icons/fa"
import FilterDropdown from "./FilterDropdown"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import PriceRangeSlider, { PriceRange } from "./PriceRangeSlider/PriceRangeSlider"
import { useDebouncedCallback } from "use-debounce"
import { getCollectionFilters } from "@/utils/utils"
import type { ProductsEdge } from "@/lib/shopify/types"

interface SidebarProps {
    collectionName: string
    productsEdges: ProductsEdge[]
}

const Sidebar: FC<SidebarProps> = ({ collectionName, productsEdges }) => {
    const [isActive, setIsActive] = useState(false)
    const [hidden, setIsHidden] = useState(true)
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const filterItems = getCollectionFilters(collectionName)

    const minPrices = productsEdges.map((edge) => Number(edge.node.priceRange.minVariantPrice.amount))
    const maxPrices = productsEdges.map((edge) => Number(edge.node.priceRange.maxVariantPrice.amount))

    const minVariantPrice = minPrices.length ? Math.min(...minPrices) : 0
    const maxVariantPrice = maxPrices.length ? Math.max(...maxPrices) : 500

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())

            params.append(name, value)

            return params.toString()
        },
        [searchParams]
    )

    const removeFromQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())

            params.delete(name, value)

            return params.toString()
        },
        [searchParams]
    )

    const handleChange = (name: string, value: string | boolean, checkbox: HTMLInputElement | null) => {
        name = name.toLowerCase()

        if (!checkbox) return

        if (name === "Ready for sale".toLowerCase()) {
            name = "available"
            value = value === "Available" ? true : false
        }

        value = value.toString()

        if (checkbox.checked) {
            router.replace(pathname + "?" + createQueryString(name, value))
        } else {
            router.replace(pathname + "?" + removeFromQueryString(name, value))
        }
    }

    const onPriceInput = useDebouncedCallback(({ min, max }: PriceRange) => {
        if (min < 0 || !max) return

        const params = new URLSearchParams(searchParams.toString())

        params.set("min", min.toString())
        params.set("max", max.toString())

        router.replace(pathname + "?" + params.toString())
    }, 500)

    const handleClick = () => {
        const timeout = isActive ? 500 : 0

        setIsActive((prev) => !prev)
        setTimeout(() => {
            if (isActive) {
                return setIsHidden(true)
            }

            setIsHidden(false)
        }, timeout)
    }

    return (
        <aside
            className={`
            bg-white
            h-full 
            fixed
            top-0 
            left-0
            ${isActive ? "w-[70%] sm:w-[60%] md:w-[40%]" : "w-0"}
            transition-[width] 
            duration-500
            lg:z-10
            z-[2000]
            shadow-[2px_0_8px_rgba(0,0,0,0.15)]
            lg:h-auto
            lg:static
            lg:w-auto
            lg:shadow-none
        `}
        >
            <div className="relative w-full h-0">
                <button
                    className="
                        absolute
                        left-full
                        top-[25vh]
                        lg:hidden
                        flex
                        items-center
                        justify-center
                        w-10
                        h-10
                        bg-slate-700
                        text-white
                        rounded-lg
                        rounded-l-none
                        p-2
                        z-[2000]
                    "
                    type="button"
                    onClick={handleClick}
                >
                    <FaFilter size="28" />
                </button>
            </div>
            <div
                className={`
                relative
                lg:p-0
                grid
                gap-[30px]
                lg:overflow-visible
                ${isActive ? "h-full overflow-x-auto overflow-y-scroll opacity-100" : "h-auto overflow-hidden opacity-0"}
                ${!hidden ? "p-5" : "p-0"}
                lg:opacity-100
                transition-opacity 
                duration-500
            `}
            >
                <div>
                    <form action="#">
                        <ul className="flex flex-col gap-6">
                            <li>
                                <h4 className="mb-[15px] font-bold text-neutral-600 whitespace-nowrap">Price</h4>

                                <PriceRangeSlider
                                    start={[
                                        minVariantPrice === maxVariantPrice ? 0 : Math.floor(minVariantPrice),
                                        Math.ceil(maxVariantPrice)
                                    ]}
                                    range={{
                                        min: 0,
                                        max: 500
                                    }}
                                    step={1}
                                    onChange={onPriceInput}
                                />
                            </li>

                            {filterItems.map((item) => (
                                <li key={item.label} className="overflow-hidden">
                                    <h4 className="mb-[15px] font-bold text-neutral-600 whitespace-nowrap">
                                        {item.label}
                                    </h4>

                                    <FilterDropdown
                                        items={item.items}
                                        onChange={handleChange}
                                        paramLabel={item.label}
                                    />
                                </li>
                            ))}
                        </ul>
                    </form>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar
