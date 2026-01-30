"use client"

import type { CurrentUser } from "@/actions/auth/getCurrentUser"
import { addProductToWishlist } from "@/actions/prisma/addProductToWishlist"
import { removeProductFromWishlist } from "@/actions/prisma/removeProductFromWishlist"
import { useRouter } from "next/navigation"
import { FC, useState } from "react"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import toast from "react-hot-toast"

interface AddToWishlistButtonProps {
    handle: string
    currentUser?: CurrentUser
}

const AddToWishlistButton: FC<AddToWishlistButtonProps> = ({ handle, currentUser }) => {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleWishlistButtonClick = async (handle: string) => {
        try {
            if (!currentUser) {
                throw new Error("Please login before adding an item to your wish list")
            }

            if (isLoading) {
                return
            }

            setIsLoading(true)

            const alreadyInWishlist = currentUser.wishlist?.productHandles.includes(handle)

            if (alreadyInWishlist) {
                await removeProductFromWishlist(handle)

                toast.success("Product successfully removed from wishlist", {
                    id: "wishlist"
                })
            } else {
                await addProductToWishlist(handle)

                toast.success("Product successfully added to wishlist", {
                    id: "wishlist"
                })
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message)

                toast.error(error.message, {
                    id: "wishlist"
                })
            }
        } finally {
            setIsLoading(false)

            router.refresh()
        }
    }

    return (
        <button
            type="button"
            className="absolute top-0 left-0 z-20 cursor-pointer"
            onClick={() => handleWishlistButtonClick(handle)}
        >
            {currentUser?.wishlist?.productHandles.includes(handle) ? (
                <AiFillHeart size={34} className="transition-all text-rose-600 hover:text-rose-300" />
            ) : (
                <AiOutlineHeart
                    size={34}
                    className="opacity-1 lg:opacity-0 group-hover:opacity-100 transition-all text-rose-300 hover:text-rose-600"
                />
            )}
        </button>
    )
}

export default AddToWishlistButton
