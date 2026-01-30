"use client"

import { CurrentUser } from "@/actions/auth/getCurrentUser"
import { SIGN_OUT_CALLBACK_URL } from "@/auth.routes"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { FC } from "react"
import Button from "./UI/Button"

enum ProfileRoutes {
    INFO = "INFO",
    ORDERS = "ORDERS",
    WISHLIST = "WISHLIST",
    CART = "CART"
}

interface ProfileTabsProps {
    currentUser?: CurrentUser
}

const tabRoutes = [
    { label: ProfileRoutes.INFO, url: "/profile/info" },
    { label: ProfileRoutes.ORDERS, url: "/profile/orders" },
    { label: ProfileRoutes.WISHLIST, url: "/profile/wishlist" },
    { label: ProfileRoutes.CART, url: "/profile/cart" }
]

const ProfileTabs: FC<ProfileTabsProps> = ({ currentUser }) => {
    const pathname = usePathname()

    return (
        <ul className="flex xl:flex-col">
            {tabRoutes.map((route) => {
                const label = `${route.label[0].toUpperCase()}${route.label.slice(1).toLocaleLowerCase()}`

                return (
                    <li
                        key={route.url}
                        className={`
                                text-lg
                                bg-white
                                text-neutral-700
                                hover:bg-neutral-100
                                border-b-2
                                xl:border-b-0
                                xl:border-l-2
                                ${pathname === route.url ? "xl:border-l-rose-600 border-b-rose-600" : "xl:border-l-white border-b-white"}
                            `}
                    >
                        <Link href={route.url} className="py-2 px-4 block">
                            {label}
                        </Link>
                    </li>
                )
            })}

            {currentUser && (
                <Button
                    className={`
                        hidden
                        xl:block
                        text-left
                        py-2
                        px-4
                        rounded-md
                        mt-5
                    `}
                    onClick={() => {
                        signOut({
                            callbackUrl: SIGN_OUT_CALLBACK_URL
                        })
                    }}
                >
                    Sign Out
                </Button>
            )}
        </ul>
    )
}

export default ProfileTabs
