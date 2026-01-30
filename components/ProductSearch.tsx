"use client"

import Image from "next/image"
import { ChangeEvent, useEffect, useState } from "react"
import { CiSearch } from "react-icons/ci"
import { RotatingLines } from "react-loader-spinner"
import placeholder from "@/public/placeholder.jpg"
import Link from "next/link"
import { roboto } from "@/utils/fonts"
import type { Product } from "@/lib/shopify/types"
import { useDebouncedCallback } from "use-debounce"
import { getProductsBySearch } from "@/actions/shopify/getProductsBySearch"
import { usePathname } from "next/navigation"
import { isDev, STORE_SETTINGS } from "@/config/settings.config"

const ProductSearch = () => {
    const [focus, setFocus] = useState(false)
    const [value, setValue] = useState("")
    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        return () => {
            setValue("")
            setProducts([])
        }
    }, [pathname])

    const loadProducts = useDebouncedCallback(async (term: string) => {
        try {
            const variables = {
                first: STORE_SETTINGS.productSearchCount,
                query: `title:${term}*`
            }

            const result = await getProductsBySearch(variables)

            if (!result.length) {
                return setProducts([])
            }

            const filtered = result.filter((product: Product) => product.id?.length >= 1)

            setProducts(filtered)
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            }
        } finally {
            setIsLoading(false)
        }
    }, 500)

    const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
        try {
            setIsLoading(true)

            const term = event.target.value

            setValue(term)

            await loadProducts(term)
        } catch (error) {
            if (error instanceof Error && isDev) {
                console.error("PRODUCT SEARCH CLIENT ERROR: ", error.message)
            }
        }
    }

    return (
        <form
            className={`
                relative
                w-full 
                ${focus ? "md:w-[80%] lg:w-[40%]" : "md:w-[50%] lg:w-[25%]"}
                transition-all
            `}
            onSubmit={(event) => event.preventDefault()}
        >
            <input
                type="text"
                placeholder="What do you want to find?"
                name="search"
                className={`
                    w-full
                    h-11 
                    flex 
                    items-center 
                    rounded-[9999px] 
                    border 
                    border-neutral-300 
                    py-[10px] 
                    pl-11
                    pr-5
                    text-sm
                    text-neutral-500
                    placeholder:text-neutral-300
                    focus:outline-none
                    focus:border-neutral-400
                    transition-colors
                `}
                onFocus={() => setFocus(true)}
                onBlur={() => {
                    setTimeout(() => setFocus(false), 100)
                }}
                onChange={handleSearch}
                value={value}
                maxLength={50}
                autoComplete="off"
            />

            <div className="absolute top-1/2 -translate-y-1/2 left-[15px] text-neutral-400">
                <CiSearch size={24} />
            </div>

            <div
                className={`
                ${(focus && value && products.length) || isLoading ? "flex" : "hidden"}
                flex-col
                absolute    
                top-[100%] 
                left-0 
                right-0 
                w-full 
                max-h-[790px]
                md:max-h-[440px]
                bg-white
                shadow-md 
                p-5
                rounded-xl
                overflow-hidden
                z-50
            `}
            >
                {isLoading ? (
                    <div className="flex justify-center">
                        <RotatingLines
                            strokeColor="#666"
                            strokeWidth="2"
                            animationDuration="0.75"
                            width="50"
                            visible={true}
                        />
                    </div>
                ) : (
                    products.map((product) => {
                        if (!product.id) return null

                        return (
                            <div
                                key={product.id}
                                className="grid grid-cols-1 md:grid-cols-[33%_1fr] gap-3 border-b border-b-neutral-200 py-4 last:border-none last:pb-0 first:pt-0"
                            >
                                <div className="h-28 flex justify-center">
                                    <Link href={`/products/${product.handle}`} className="relative h-full w-full">
                                        <Image
                                            className="h-full w-auto max-w-full object-contain"
                                            fill
                                            sizes="100%"
                                            src={product.featuredImage?.url ?? placeholder}
                                            alt={product.featuredImage?.altText || product.title}
                                        />
                                    </Link>
                                </div>
                                <div className="w-full pl-4">
                                    <Link
                                        href={`/products/${product.handle}`}
                                        className="text-neutral-500 font-medium mb-5 hover:text-neutral-700 transition-colors line-clamp-1"
                                    >
                                        {product.title}
                                    </Link>
                                    <div className={`${roboto.className} text-sm text-neutral-400 line-clamp-3`}>
                                        {product.description}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </form>
    )
}

export default ProductSearch
