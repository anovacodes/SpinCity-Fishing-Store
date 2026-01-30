import Link from "next/link"
import { BiSolidUser } from "react-icons/bi"
import { AiOutlineHeart } from "react-icons/ai"
import CartLink from "./CartLink"
import type { CurrentUser } from "@/actions/auth/getCurrentUser"
import type { FC } from "react"

interface ShopActionsProps {
    currentUser?: CurrentUser
}

const ShopActions: FC<ShopActionsProps> = ({ currentUser }) => {
    return (
        <div className="flex items-center gap-3 pr-2">
            <Link
                href="/profile/info"
                className={`
                    ${currentUser ? "text-rose-600 hover:text-rose-400" : "text-neutral-700 hover:text-neutral-600"} 
                    transition-colors
                `}
            >
                <BiSolidUser size={28} />
            </Link>

            <Link href="/profile/wishlist" className="text-neutral-400 hover:text-neutral-500 transition-colors">
                <AiOutlineHeart size={28} />
            </Link>

            <CartLink />
        </div>
    )
}

export default ShopActions
