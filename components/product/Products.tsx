"use client"

import type { ProductsEdge, Variables } from "@/lib/shopify/types"
import { FC, useEffect, useRef, useState } from "react"
import ProductCard from "./ProductCard"
import LoadMoreButton from "../UI/LoadMoreButton"
import EmptyState from "../UI/EmptyState"
import { getProductsFromCollection } from "@/actions/shopify/getProductsFromCollection"
import { productsFromCollectionQuery, productsQuery } from "@/lib/shopify/queries/products"
import { getProducts } from "@/actions/shopify/getProducts"
import type { CurrentUser } from "@/actions/auth/getCurrentUser"
import { ReviewsSummary } from "./ProductsSliderWrapper"
import { getReviewsSummary } from "@/actions/prisma/getReviewsSummary"
import { useSearchParams } from "next/navigation"
import { isDev } from "@/config/settings.config"

type ListType = "best-selling" | "products-from-collection" | "wishlist"

interface ProductsProps {
    variables?: Variables
    itemsPerPage: number
    type: ListType
    productsEdges: ProductsEdge[]
    currentUser?: CurrentUser
}

const Products: FC<ProductsProps> = ({ productsEdges = [], type, variables = {}, itemsPerPage, currentUser }) => {
    const [products, setProducts] = useState<ProductsEdge[]>(productsEdges)
    const [reviewsSummary, setReviewsSummary] = useState<ReviewsSummary[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [cursor, setCursor] = useState("")
    const searchParams = useSearchParams()
    const previousSearchParams = useRef(searchParams.toString())

    useEffect(() => {
        switch (type) {
            case "best-selling":
                break
            case "products-from-collection":
                const currentSearchParams = searchParams.toString()

                if (
                    (!currentSearchParams && !previousSearchParams.current) ||
                    currentSearchParams === previousSearchParams.current
                ) {
                    return
                }

                previousSearchParams.current = currentSearchParams

                setProducts(productsEdges)
                break
            case "wishlist":
                setProducts(productsEdges)
                break
        }
    }, [productsEdges, type, searchParams])

    useEffect(() => {
        const getReviewsSummaryByClient = async () => {
            try {
                const data: ReviewsSummary[] = await getReviewsSummary(products)

                setReviewsSummary(data)
            } catch (error) {
                if (error instanceof Error && isDev) {
                    console.error("GET REVIEWS SUMMARY BY CLIENT ERROR: ", error.message)
                }
            }
        }

        getReviewsSummaryByClient()
    }, [products])

    const handleClick = async () => {
        if (isLoading || type === "wishlist") return null

        try {
            if (cursor) {
                setIsLoading(true)

                if (type === "products-from-collection") {
                    const edges = await getProductsFromCollection(productsFromCollectionQuery, {
                        ...variables,
                        after: cursor
                    })

                    setProducts([...products, ...edges])
                } else if (type === "best-selling") {
                    const edges = await getProducts(productsQuery, {
                        ...variables,
                        after: cursor
                    })

                    setProducts([...products, ...edges])
                }
            }
        } catch (error) {
            if (error instanceof Error && isDev) {
                console.error("LOAD PRODUCTS FROM CLIENT ERROR: ", error.message)
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            {products.length ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[30px]">
                    {products.map((product, index) => {
                        const isLastItem = index + 1 === products.length

                        if (isLastItem && cursor !== product.cursor) {
                            setCursor(product.cursor)
                        }

                        const summary = reviewsSummary?.find((review) => review?.productHandle === product.node.handle)

                        return (
                            <li key={product.node?.id ?? index}>
                                <ProductCard
                                    product={product}
                                    sectionType={type}
                                    currentUser={currentUser}
                                    reviewsSummary={summary}
                                />
                            </li>
                        )
                    })}
                </ul>
            ) : (
                <EmptyState title="No products found :(" />
            )}

            {type !== "wishlist" && (
                <LoadMoreButton items={products} itemsPerPage={itemsPerPage} onClick={handleClick} />
            )}
        </div>
    )
}

export default Products
