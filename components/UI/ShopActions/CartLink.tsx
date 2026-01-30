"use client"

import { useCart } from "@/hooks/useCart"
import Link from "next/link"
import { useEffect, useState } from "react"
import { BsCart2 } from "react-icons/bs"

const CartLink = () => {
    const [isClient, setIsClient] = useState(false)
    const { cart } = useCart((state) => ({ cart: state.cart }))

    useEffect(() => setIsClient(true), [])

    return (
        <div className="relative">
            <Link href="/profile/cart" className="text-neutral-400 hover:text-neutral-500 transition-colors">
                <div
                    className={`
                        absolute 
                        top-0 
                        right-0 
                        bg-rose-600 
                        w-5 
                        h-5 
                        translate-x-[40%]
                        translate-y-[-25%] 
                        rounded-full
                        text-white
                        leading-[1.4]
                        text-center
                        text-sm
                        select-none
                    `}
                >
                    {(isClient && cart?.totalQuantity) || "0"}
                </div>
                <BsCart2 size={28} />
            </Link>
        </div>
    )
}

export default CartLink
