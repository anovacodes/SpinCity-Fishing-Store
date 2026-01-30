import type { Cart, ProductVariant, ProductVariantSelectedOptions } from "@/lib/shopify/types"
import { compareTwoArraysOfObjects } from "@/utils/utils"
import { useEffect, useState } from "react"

interface UseCurrentVariantInput {
    cart: Cart | null
    productVariantNodes: ProductVariant[]
    activeOptions: ProductVariantSelectedOptions[]
}

export const useCurrentVariant = ({ cart, productVariantNodes, activeOptions }: UseCurrentVariantInput) => {
    const [currentVariant, setCurrentVariant] = useState(productVariantNodes[0])
    const [alreadyInCart, setAlreadyInCart] = useState(false)

    useEffect(() => {
        const variant = productVariantNodes.find((node) => {
            const productWithSuchOptionsExists = compareTwoArraysOfObjects(activeOptions, node.selectedOptions)

            if (productWithSuchOptionsExists) {
                return node
            }
        })

        if (variant) {
            setCurrentVariant(variant)
        }
    }, [activeOptions, productVariantNodes])

    useEffect(() => {
        const checkIfVariantAlreadyInCart = () => {
            if (!cart) {
                return
            }

            for (const node of cart.lines.nodes) {
                if (node.merchandise.id === currentVariant.id) {
                    return setAlreadyInCart(true)
                }

                setAlreadyInCart(false)
            }
        }

        checkIfVariantAlreadyInCart()
    }, [ cart, currentVariant.id ])

    return { currentVariant, alreadyInCart }
}