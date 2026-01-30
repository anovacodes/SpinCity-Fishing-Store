"use client"

import type { CurrentUser } from "@/actions/auth/getCurrentUser"
import { getRelatedCartId } from "@/actions/prisma/getRelatedCartId"
import { registerCart } from "@/actions/prisma/registerCart"
import { getCartById } from "@/actions/shopify/cart/getCartById"
import { updateCartBuyerIdentity } from "@/actions/shopify/cart/updateCartBuyerIdentity"
import { AuthorizeAction } from "@/auth.routes"
import { isDev } from "@/config/settings.config"
import { useCart } from "@/hooks/useCart"
import { useSearchParams } from "next/navigation"
import { FC, useEffect } from "react"

interface CartHelperProps {
    currentUser?: CurrentUser
}

const CartHelper: FC<CartHelperProps> = ({ currentUser }) => {
    const searchParams = useSearchParams()
    const { cart, setCart, clearCart } = useCart((state) => ({
        cart: state.cart,
        setCart: state.setCart,
        clearCart: state.clearCart
    }))

    useEffect(() => {
        if (!currentUser) {
            const isSignedOut = searchParams.get("action") === AuthorizeAction.SIGN_OUT

            if (isSignedOut) {
                clearCart()
            }

            return
        }

        const handleCart = async () => {
            try {
                const relatedCartId = await getRelatedCartId(currentUser.id)

                if (cart && !cart.buyerIdentity.customer) {
                    clearCart()
                }

                if (relatedCartId && !cart) {
                    const shopifyCart = await getCartById(relatedCartId)

                    setCart(shopifyCart)

                    return
                }

                if (relatedCartId || !cart) return

                const registerCartData = await registerCart(cart.id, currentUser.id)

                if (!registerCartData && cart.buyerIdentity.customer) return

                const data = await updateCartBuyerIdentity(cart.id)

                if (!data) return

                const { cart: updatedCart } = data

                setCart(updatedCart)
            } catch (error) {
                if (isDev) {
                    console.error("HANDLE CART ERROR: ", error)
                }

                if (error instanceof Error) {
                    throw new Error(error.message)
                }
            }
        }

        handleCart()
    }, [cart, currentUser, setCart, clearCart, searchParams])

    return <></>
}

export default CartHelper
