import Link from "next/link"
import Container from "../Container"
import { roboto } from "@/utils/fonts"
import Navbar from "../Navbar/Navbar"
import { getMenu } from "@/actions/shopify/getMenu"
import { menuQuery } from "@/lib/shopify/queries/menu"
import Social from "../UI/Social/Social"
import Burger from "../UI/Burger/Burger"
import ShopActions from "../UI/ShopActions/ShopActions"
import type { CurrentUser } from "@/actions/auth/getCurrentUser"
import type { FC } from "react"

interface HeaderTopProps {
    currentUser?: CurrentUser
}

const HeaderTop: FC<HeaderTopProps> = async ({ currentUser }) => {
    const menuItems = await getMenu(menuQuery, {
        handle: "main-menu"
    })

    return (
        <div>
            <Container>
                <div className="flex items-center justify-between gap-5 border-b border-neutral-200 py-[10px] md:py-[5px]">
                    <div className="flex items-center gap-5 md:hidden">
                        <Burger />

                        <Link
                            href="/"
                            className="w-8 h-8 bg-rose-600 text-white rounded-full  text-xl text-center leading-normal inline-block sm:hidden select-none"
                        >
                            S
                        </Link>
                    </div>

                    <Link
                        href="/blog"
                        className={`${roboto.className} hidden group lg:flex items-center gap-2 text-neutral-700 text-sm leading-none`}
                    >
                        <div className="w-5 h-5 flex items-center justify-center bg-neutral-200 rounded-[9999px] group-hover:bg-neutral-600  transition-colors">
                            <span className={` group-hover:text-white transition-colors`}>?</span>
                        </div>
                        <span className="group-hover:text-neutral-500 transition-colors">
                            Don&apos;t know what to choose?
                        </span>
                    </Link>

                    <Navbar items={menuItems} />

                    <div className="hidden md:block">
                        <Social />
                    </div>

                    <div className="block md:hidden">
                        <ShopActions currentUser={currentUser} />
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default HeaderTop
