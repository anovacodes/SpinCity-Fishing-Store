"use client"

import { MenuItem } from "@/lib/shopify/types"
import NavbarItem from "./NavbarItem"
import { usePathname } from "next/navigation"
import { FC } from "react"

interface NavbarProps {
    items: MenuItem[]
}

const Navbar: FC<NavbarProps> = ({ items = [] }) => {
    const pathname = usePathname()

    return (
        <nav>
            <ul className="hidden md:flex items-center flex-wrap gap-8">
                {items.map((item) => (
                    <NavbarItem
                        key={item.resourceId}
                        item={item}
                        pathname={pathname}
                    />
                ))}
            </ul>
        </nav>
    )
}

export default Navbar
