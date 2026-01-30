"use client"

import type { Cart } from "@/lib/shopify/types"
import { FC, useEffect, useState } from "react"
import EmptyState from "./UI/EmptyState"
import { formatCurrency } from "@/utils/utils"
import { useCart } from "@/hooks/useCart"
import { deleteCart } from "@/actions/prisma/deleteCart"
import type { CurrentUser } from "@/actions/auth/getCurrentUser"
import ErrorNotification from "./UI/ErrorNotification"
import toast from "react-hot-toast"
import Button from "./UI/Button"
import CartItem from "./CartItem"
import { STORE_SETTINGS } from "@/config/settings.config"

interface CartProps {
    currentUser?: CurrentUser
}

const Cart: FC<CartProps> = ({ currentUser }) => {
    const [isClient, setIsClient] = useState(false)
    const { cart, isLoading, errors, removeFromCart, changeQuantity, clearCart } = useCart((state) => ({
        cart: state.cart,
        isLoading: state.isLoading,
        errors: state.errors,
        removeFromCart: state.removeFromCart,
        changeQuantity: state.changeQuantity,
        clearCart: state.clearCart
    }))

    const total = formatCurrency(cart?.cost.totalAmount.amount, cart?.cost.totalAmount.currencyCode) || "$0"

    useEffect(() => {
        setIsClient(true)
    }, [])

    const handleCheckout = async (checkoutUrl: string) => {
        if (!isClient || !cart || isLoading || !checkoutUrl) return null

        if (STORE_SETTINGS.checkoutPossibilityStatus === "disabled") {
            return toast.error("Checkout is temporarily disabled", {
                id: "cart"
            })
        }

        try {
            if (currentUser) {
                await deleteCart(cart.id, currentUser.id)
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message)

                toast.error(error.message, {
                    id: "cart"
                })
            }
        } finally {
            clearCart()
            window.open(checkoutUrl, "_blank")
        }
    }

    if (!isClient) return null

    if (!cart?.lines.nodes.length) {
        return (
            <EmptyState title="Your cart is empty!" text="Must add items to the cart before you proceed to checkout." />
        )
    }

    return (
        <div>
            {errors.map((error, index) => (
                <ErrorNotification key={`${error}-${index}`} message={error} />
            ))}

            <ul
                className={`
                    flex 
                    flex-col 
                    gap-4 
                    mb-8
                    ${errors.length > 0 ? "mt-5" : "mt-0"}
                `}
            >
                {cart?.lines.nodes.map((node) => {
                    return (
                        <li key={node.id}>
                            <CartItem
                                node={node}
                                isLoading={isLoading}
                                changeQuantity={changeQuantity}
                                removeFromCart={removeFromCart}
                            />
                        </li>
                    )
                })}
            </ul>

            <div className="flex justify-end gap-3 text-2xl text-neutral-700 mb-4">
                <span className="font-medium">Total price:</span>
                <span className="font-semibold">{total}</span>
            </div>

            <Button
                className={`
                    w-full
                    md:w-1/3
                    font-semibold
                    ml-auto
                    py-4
                    px-5
                `}
                onClick={() => handleCheckout(cart?.checkoutUrl || "")}
            >
                Proceed to Checkout
            </Button>
        </div>
    )
}

export default Cart
