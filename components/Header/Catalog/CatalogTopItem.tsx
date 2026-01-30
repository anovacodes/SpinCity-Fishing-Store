"use client"

import Link from "next/link"
import { FiChevronDown, FiChevronUp } from "react-icons/fi"
import CatalogMenu from "./CatalogMenu"
import { FC, useEffect, useState } from "react"
import type { CatalogItem } from "@/lib/shopify/types"
import { useCatalog } from "@/hooks/useCatalog"
import { useRouter } from "next/navigation"
import { useResize } from "@/hooks/useResize"

interface CatalogTopItem {
    item: CatalogItem
}

const CatalogTopItem: FC<CatalogTopItem> = ({ item }) => {
    const [isActive, setIsActive] = useState(false)
    const { width } = useResize()
    const [pathname, setPathname] = useState("")
    const router = useRouter()
    const { onClose } = useCatalog((state) => ({
        onClose: state.onClose
    }))

    useEffect(() => {
        const url = new URL(item.url)

        setPathname(url.pathname)
    }, [item, pathname])

    const handleClick = () => {
        if (width >= 768) {
            return null
        }

        setIsActive((prev) => !prev)
    }

    return (
        <li
            onMouseOver={() => {
                if (width < 768) {
                    return null
                }

                setIsActive(true)
            }}
            onMouseLeave={() => {
                if (width < 768) {
                    return null
                }

                setIsActive(false)
            }}
            className="group flex justify-between flex-col w-full md:w-auto transition-colors pr-5 md:pr-0"
        >
            <div className="flex justify-between items-center">
                <Link
                    href={pathname}
                    onClick={(event) => {
                        if (width >= 768) {
                            return null
                        }

                        event.preventDefault()
                        onClose()
                        router.push(pathname)
                    }}
                    className="text-xl md:text-base w-[75%] md:w-full text-neutral-700 md:px-3 lg:px-[25px] md:group-first:pl-0"
                >
                    <span className="inline-block pl-5 md:pl-0 py-5 md:py-3 md:group-hover:text-rose-600 transition-colors md:border-b border-b-transparent md:group-hover:border-b-rose-600">
                        {item.title}
                    </span>
                </Link>

                {item.items.length > 0 && (
                    <span
                        className=" text-neutral-500 top-5 md:hidden"
                        onClick={handleClick}
                    >
                        {isActive ? (
                            <FiChevronUp size={32} />
                        ) : (
                            <FiChevronDown size={32} />
                        )}
                    </span>
                )}
            </div>

            <CatalogMenu
                isActive={isActive}
                items={item.items}
                width={width}
                mainCollectionPathname={pathname}
            />
        </li>
    )
}

export default CatalogTopItem
