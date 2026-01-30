import type { ProductsEdge } from "@/lib/shopify/types"
import Image from "next/image"
import placeholder from "@/public/placeholder.jpg"
import Link from "next/link"
import { roboto } from "@/utils/fonts"
import { calculateDiscount, convertMetafieldLabelToReadableFormat } from "@/utils/utils"
import type { CurrentUser } from "@/actions/auth/getCurrentUser"
import type { FC } from "react"
import { ReviewsSummary } from "./ProductsSliderWrapper"
import StarRating from "../UI/StarRating"
import AddToWishlistButton from "../UI/AddToWishlistButton"
import ProductPrice from "./ProductPrice"

interface ProductCardProps {
    product: ProductsEdge
    sectionType: string
    currentUser?: CurrentUser
    reviewsSummary?: ReviewsSummary
}

const ProductCard: FC<ProductCardProps> = ({ product, sectionType, currentUser, reviewsSummary }) => {
    const { node } = product
    const { handle, title, featuredImage, compareAtPriceRange, priceRange, metafields = [] } = node

    const maxVariantOldPrice = Number(compareAtPriceRange.maxVariantPrice.amount)

    const discountExists = maxVariantOldPrice > 0
    const discountPercent = calculateDiscount(maxVariantOldPrice, priceRange.minVariantPrice.amount)

    return (
        <div className="group bg-white">
            <div className="p-3 bg-white overflow-hidden">
                <div className="relative h-48 w-full bg-white">
                    <Link
                        className="relative block w-full h-full z-10"
                        as={`/products/${handle}`}
                        href={`/products/${handle}`}
                    >
                        <Image
                            className="object-contain max-w-full w-auto h-full cursor-pointer"
                            fill
                            sizes="100%"
                            src={featuredImage?.url ?? placeholder}
                            alt={featuredImage?.altText ?? title}
                            priority={true}
                        />
                    </Link>

                    <AddToWishlistButton handle={handle} currentUser={currentUser} />

                    {discountExists && (
                        <div className="z-30 bg-rose-600 text-2xl font-bold text-white py-1 px-14 rotate-45 absolute top-[5px] -right-[58px]">
                            {discountPercent}%
                        </div>
                    )}
                </div>
            </div>

            <div className="p-[15px]">
                <Link
                    as={`/products/${handle}`}
                    href={`/products/${handle}`}
                    className="text-lg font-medium text-neutral-700 hover:text-neutral-500 transition-colors line-clamp-2 h-[56px] mb-[14px]"
                    title={title}
                >
                    <h4>{title}</h4>
                </Link>

                <ul
                    className={`${roboto.className} text-sm font-medium text-neutral-400 grid grid-cols-2 gap-1 h-11 overflow-hidden`}
                >
                    {metafields.map((item) => {
                        if (item) {
                            const label = convertMetafieldLabelToReadableFormat(item.key)

                            return (
                                <li key={item.key} className="flex gap-2 even:justify-end">
                                    <span>{`${label}:`}</span>
                                    <span>{item.value.length > 5 ? item.value.substring(0, 5) : item.value}</span>
                                </li>
                            )
                        }
                    })}
                </ul>

                <div className="my-[14px] flex items-center gap-3">
                    <StarRating starSize={16} id={`${handle}-${sectionType}`} rating={reviewsSummary?.rating ?? 0} />

                    <Link
                        href={`/products/${handle}`}
                        className={`${roboto.className} text-sm text-neutral-400 -mb-[2px] hover:underline`}
                    >
                        {reviewsSummary ? reviewsSummary.count : 0}
                    </Link>
                </div>

                <ProductPrice
                    size="small"
                    discountExists={discountExists}
                    minVariantPrice={{
                        amount: product.node.priceRange.minVariantPrice.amount,
                        currencyCode: product.node.priceRange.minVariantPrice.currencyCode
                    }}
                    maxVariantPrice={{
                        amount: product.node.compareAtPriceRange.maxVariantPrice.amount,
                        currencyCode: product.node.compareAtPriceRange.maxVariantPrice.currencyCode
                    }}
                />
            </div>
        </div>
    )
}

export default ProductCard
