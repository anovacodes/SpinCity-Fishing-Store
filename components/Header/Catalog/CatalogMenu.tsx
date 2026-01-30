"use client"

import type { CatalogItem } from "@/lib/shopify/types"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCatalog } from "@/hooks/useCatalog"
import { FC } from "react"

interface CatalogMenuProps {
    isActive?: boolean
    items: CatalogItem[]
    width: number
    mainCollectionPathname: string
}

const CatalogMenu: FC<CatalogMenuProps> = ({ isActive, items = [], width, mainCollectionPathname }) => {
    const router = useRouter()
    const { onClose } = useCatalog((state) => ({
        onClose: state.onClose
    }))

    if (!items.length && width >= 768) {
        return null
    }

    return (
        <>
            {isActive && (
                <div className="md:absolute inset-0 top-10 md:top-[100%] bottom-auto h-200px bg-white md:shadow-xl md:border-t md:border-t-neutral-200 py-0 md:py-7 z-10">
                    <ul
                        className={`
                            flex 
                            flex-col 
                            items-center 
                            ${items.length >= 6 && width >= 768 ? "justify-between" : "justify-start"}
                            ${items.length <= 6 && width >= 768 ? "gap-20" : "gap-0"}
                            md:flex-row 
                            md:items-start
                        `}
                    >
                        {items.map((item) => {
                            const { pathname } = new URL(item.url)

                            const fixedPathname = pathname.split("/").at(-1)

                            return (
                                <li key={item.id} className="w-full md:w-auto">
                                    <Link
                                        href={`${mainCollectionPathname}/${fixedPathname}`}
                                        onClick={(event) => {
                                            if (width >= 768) {
                                                return null
                                            }

                                            event.preventDefault()
                                            onClose()
                                            router.push(`${mainCollectionPathname}/${fixedPathname}`)
                                        }}
                                        className="text-xl md:text-base inline-block w-[75%] md:w-auto pl-10 md:pl-0 py-3 md:py-0 mb-0 md:mb-6 md:uppercase text-neutral-700 hover:text-neutral-500 transition-colors"
                                    >
                                        {item.title}
                                    </Link>

                                    <ul className="hidden md:block md:mb-6">
                                        {item.items.map((i) => {
                                            const { pathname: pathname2 } = new URL(i.url)

                                            if (!pathname2) {
                                                return null
                                            }

                                            const slug = pathname2.split("/").at(-1)

                                            const targetUrl = `${mainCollectionPathname}/${fixedPathname}/${slug}`

                                            return (
                                                <li key={i.id} className="w-full">
                                                    <Link
                                                        href={targetUrl}
                                                        className="inline-block py-[2px] pl-6 md:pl-0 text-neutral-400 hover:text-neutral-500 transition-colors"
                                                        onClick={(event) => {
                                                            event.preventDefault()
                                                            onClose()
                                                            router.push(targetUrl)
                                                        }}
                                                    >
                                                        {i.title}
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </li>
                            )
                        })}
                    </ul>
                    {width >= 768 && (
                        <Link
                            className="inline-block text-neutral-500 hover:text-neutral-400 transition-colors"
                            href={mainCollectionPathname}
                        >
                            View all
                        </Link>
                    )}
                </div>
            )}
        </>
    )
}

export default CatalogMenu
