import { addItemToCart } from "@/actions/shopify/cart/addItemToCart"
import { changeCartItemQuantity } from "@/actions/shopify/cart/changeCartItemQuantity"
import { createCart } from "@/actions/shopify/cart/createCart"
import { removeItemsFromCart } from "@/actions/shopify/cart/removeItemsFromCart"
import { STORE_SETTINGS } from "@/config/settings.config"
import type { Cart, CartLineUpdateInput } from "@/lib/shopify/types"
import toast from "react-hot-toast"
import { create, StateCreator } from "zustand"
import { persist, PersistOptions } from "zustand/middleware"

interface UseCartStore {
    cart: Cart | null
    isLoading: boolean
    errors: Array<string>
    addToCart: (currentVariantId: string) => Promise<void>
    addItemToCart: (currentVariantId: string) => Promise<void>
    createCart: (currentVariantId: string) => Promise<void>
    removeFromCart: (lineIds: string[]) => Promise<void>
    changeQuantity: ({ id, quantity }: CartLineUpdateInput) => Promise<void>
    clearErrors: () => void
    setCart: (cart: Cart) => void
    clearCart: () => void
}

type UseCartPersist = (
    config: StateCreator<UseCartStore>,
    options: PersistOptions<UseCartStore>
) => StateCreator<UseCartStore>

export const useCart = create<UseCartStore, []>(
    (persist as UseCartPersist)(
        (set, get): UseCartStore => ({
            cart: null,
            isLoading: false,
            errors: [],
            addToCart: async currentVariantId => {
                set({ isLoading: true })
                
                const { cart, addItemToCart, createCart } = get()

                try {
                    if (cart) {
                        await addItemToCart(currentVariantId)
                    } else {
                        await createCart(currentVariantId)
                    }

                    toast.success("Successfully added to the cart", {
                        id: "cart"
                    })
                } catch (error) {
                    if (error instanceof Error) {
                        console.error("Handle cart error. ", error.message)
                        toast.error(error.message, {
                            id: "cart"
                        })
                    }
                } finally {
                    set({ isLoading: false })
                }
            },
            addItemToCart: async currentVariantId => {
                const cart = get().cart
        
                if (!cart) return

                try {
                    const data = await addItemToCart(
                        [{ quantity: 1, merchandiseId: currentVariantId }],
                        cart.id
                    )
        
                    set({ cart: data.cart })
                } catch (error) {
                    if (error instanceof Error) {
                        throw new Error(error.message)
                    }
                }
            },
            createCart: async currentVariantId => {
                try {
                    const data = await createCart(
                        [{ quantity: 1, merchandiseId: currentVariantId }]
                    )
        
                    set({ cart: data })
                } catch (error) {
                    if (error instanceof Error) {
                        throw new Error(error.message)
                    }
                }
            },
            removeFromCart: async lineIds => {
                set({ isLoading: true })

                const { cart, clearCart, clearErrors } = get()
                
                if (!cart) return
                
                try {
                    const data = await removeItemsFromCart(lineIds, cart.id)

                    if (data.cart.lines.nodes.length === 0) {
                        return clearCart()
                    }

                    set({ cart: data.cart })
                } catch (error) {
                    if (error instanceof Error) {
                        console.error("Remove from cart error. ", error.message)

                        set({ errors: [ error.message ] })
                        clearErrors()
                    }
                } finally {
                    set({ isLoading: false })
                }
            },
            changeQuantity: async ({ id, quantity }) => {
                set({ isLoading: true })

                const { cart, clearErrors } = get()
                
                if (!cart) return

                try {
                    const data = await changeCartItemQuantity(
                        cart.id,
                        [{ id, quantity }]
                    )

                    set({ cart: data })
                } catch (error) {
                    if (error instanceof Error) {
                        console.error("Change quantity error. ", error.message)

                        set({ errors: [ error.message ] })
                        clearErrors()
                    }
                } finally {
                    set({ isLoading: false })
                }
            },
            clearErrors: () => setTimeout(() => set({ errors: [] }), STORE_SETTINGS.notificationVisibilityTime),
            setCart: (cart) => set({ cart }),
            clearCart: () => set({ cart: null })
        }),
        { name: "cart" }
    )
)