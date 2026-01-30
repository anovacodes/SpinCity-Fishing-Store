import Link from "next/link"
import type { FC } from "react"
import { IoHome } from "react-icons/io5"

export type Breadcrumb = {
    label: string
    href: string
}

interface BreadcrumbsProps {
    items: Breadcrumb[]
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ items = [] }) => {
    return (
        <nav className="py-[24px]">
            <ul className="flex items-center gap-x-5 gap-y-2 flex-wrap select-none text-sm text-neutral-600 leading-none">
                <li
                    className="
                        group/item 
                        flex 
                        items-center
                        gap-4
                        after:block
                        after:w-[8px]
                        after:h-[8px]
                        after:border
                        after:border-l-0
                        after:border-t-0
                        after:border-neutral-500
                        after:-rotate-45
                    "
                >
                    <Link
                        href="/"
                        className="
                            inline-block
                            py-3
                            px-5
                            rounded-md
                            group-first/item:px-0
                            group-first/item:hover:opacity-75
                            transition-opacity
                        "
                    >
                        <IoHome size={22} />
                    </Link>
                </li>

                {items.map((item) => {
                    return (
                        <li
                            className="
                                group/item 
                                flex 
                                items-center
                                gap-4
                                after:block
                                after:w-[8px]
                                after:h-[8px]
                                after:border
                                after:border-l-0
                                after:border-t-0
                                after:border-neutral-500
                                after:-rotate-45
                                last:after:hidden
                            "
                            key={item.href}
                        >
                            <Link
                                href={item.href}
                                className="
                                        inline-block
                                        bg-neutral-100
                                        py-3
                                        px-5
                                        rounded-md
                                        group-first/item:pl-0
                                        group-last/item:bg-transparent
                                        group-last/item:pointer-events-none
                                        group-last/item:px-0
                                        group-[&:not(:last-child)]/item:hover:bg-neutral-200
                                        transition-colors
                                    "
                            >
                                {item.label}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default Breadcrumbs
