"use client"

import { MenuItem } from "@/lib/shopify/types"
import Link from "next/link"
import { FC } from "react"

interface NavbarItemProps {
    item: MenuItem
    pathname: string
}

const NavbarItem: FC<NavbarItemProps> = ({ item, pathname }) => {
    const { title, url } = item
    const fullUrl = new URL(url)

    return (
        <li className="group">
            <Link
                href={
                    fullUrl.pathname === "/pages/blog"
                        ? "/blog"
                        : fullUrl.pathname
                }
                className={`
                ${(pathname === "/blog" && fullUrl.pathname === "/pages/blog") || fullUrl.pathname === pathname ? "text-rose-600" : "text-neutral-700"}
                text-sm 
                group-hover:text-rose-600 
                transition-colors
            `}
            >
                {title}
            </Link>
        </li>
    )
}

export default NavbarItem
