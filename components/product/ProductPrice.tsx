import type { Price } from "@/lib/shopify/types"
import type { FC } from "react"
import { formatCurrency } from "@/utils/utils"

type Size = "small" | "big"

interface ProductPriceProps {
    size: Size
    discountExists: boolean
    minVariantPrice: Price
    maxVariantPrice: Partial<Price>
}

const ProductPrice: FC<ProductPriceProps> = ({ size, discountExists, minVariantPrice, maxVariantPrice }) => {
    const formattedPrice = formatCurrency(minVariantPrice.amount, minVariantPrice.currencyCode)
    const formattedDiscount = formatCurrency(maxVariantPrice.amount, maxVariantPrice.currencyCode)

    return (
        <div
            className={`
                flex 
                ${size === "big" ? "gap-[10px]" : "gap-2"}
            `}
        >
            <span
                className={`
                    ${size === "big" ? "text-3xl md:text-2xl font-semibold leading-[1.15]" : "text-xl font-medium leading-tight"} 
                    ${discountExists ? "text-rose-600" : "text-neutral-600"}
                `}
            >
                {formattedPrice}
            </span>

            {discountExists && (
                <span
                    className={`
                        ${size === "big" ? "text-lg md:text-base" : "text-sm"}
                        font-medium 
                        text-neutral-400 
                        line-through    
                    `}
                >
                    {formattedDiscount}
                </span>
            )}
        </div>
    )
}

export default ProductPrice
