"use client"

import type { Option, ProductVariant } from "@/lib/shopify/types"
import { FC, useState } from "react"
import ProductOption from "./ProductOption"
import { useCart } from "@/hooks/useCart"
import { useCurrentVariant } from "@/hooks/useCurrentVariant"
import Button from "../UI/Button"
import ProductPrice from "./ProductPrice"

interface ProductInfoProps {
    title: string
    availableForSale: boolean
    options: Option[]
    productVariantNodes: ProductVariant[]
}

const ProductInfo: FC<ProductInfoProps> = ({ title, availableForSale, options, productVariantNodes }) => {
    const [activeOptions, setActiveOptions] = useState([...productVariantNodes[0].selectedOptions])
    const { cart, isLoading, addToCart } = useCart((state) => ({
        cart: state.cart,
        isLoading: state.isLoading,
        addToCart: state.addToCart
    }))
    const { currentVariant, alreadyInCart } = useCurrentVariant({ cart, productVariantNodes, activeOptions })

    const discountExists = Boolean(currentVariant.compareAtPrice?.amount)

    return (
        <div>
            <h1 className="text-2xl font-semibold pb-5 mb-5 text-neutral-700 border-b border-b-neutral-200">{title}</h1>

            <div className="flex flex-col gap-4 border-b border-neutral-200 pb-6">
                {options.map((option) => {
                    return (
                        <ProductOption
                            key={option.id}
                            option={option}
                            onClick={setActiveOptions}
                            activeOptions={activeOptions}
                        />
                    )
                })}
            </div>

            <div className="my-5">
                <ProductPrice
                    size="big"
                    discountExists={discountExists}
                    minVariantPrice={{
                        amount: currentVariant.price.amount,
                        currencyCode: currentVariant.price.currencyCode
                    }}
                    maxVariantPrice={{
                        amount: currentVariant.compareAtPrice?.amount,
                        currencyCode: currentVariant.compareAtPrice?.currencyCode
                    }}
                />
            </div>

            {alreadyInCart ? (
                <div className="text-xl font-semibold text-rose-600">Already in cart</div>
            ) : (
                <div className="flex items-center flex-wrap gap-5">
                    <Button
                        type="button"
                        disabled={isLoading}
                        className={`
                            w-full    
                            md:w-auto
                            font-semibold
                            px-12
                            bg-neutral-600
                            hover:bg-neutral-400
                            focus:bg-neutral-400
                            disabled:bg-neutral-300
                            ${availableForSale ? "block" : "hidden"}
                        `}
                        onClick={async () => {
                            if (isLoading) return

                            await addToCart(currentVariant.id)
                        }}
                    >
                        Add to cart
                    </Button>

                    {availableForSale ? (
                        <span className="text-lg text-green-600 text-center md:text-left inline-block w-full md:w-auto">
                            Available for sale
                        </span>
                    ) : (
                        <span className="text-lg text-rose-600 text-center md:text-left inline-block w-full md:w-auto">
                            Not available
                        </span>
                    )}
                </div>
            )}
        </div>
    )
}

export default ProductInfo
