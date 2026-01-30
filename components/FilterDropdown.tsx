"use client"

import { FC, useRef, useState } from "react"
import FilterCheckbox from "./FilterCheckbox"
import { Filters } from "@/lib/shopify/types"

const DEFAULT_LIST_HEIGHT = "112px"

interface FilterDropdownProps {
    items: Filters
    onChange: (name: string, value: string, checkbox: HTMLInputElement | null) => void
    paramLabel: string
}

const FilterDropdown: FC<FilterDropdownProps> = ({ items, onChange, paramLabel }) => {
    const [listIsActive, setListIsActive] = useState(false)
    const listRef = useRef<HTMLUListElement>(null)

    const handleShowMore = () => {
        const list = listRef.current

        if (!list) return

        if (listIsActive) {
            setListIsActive(false)
            return list.style.setProperty("max-height", DEFAULT_LIST_HEIGHT)
        }

        list.style.setProperty("max-height", `${list.scrollHeight}px`)
        setListIsActive(true)
    }

    return (
        <div className="flex flex-col-reverse">
            {items.length > 4 && (
                <button
                    className="mt-3 text-left text-sm text-neutral-500 hover:opacity-75 transition-opacity whitespace-nowrap"
                    type="button"
                    onClick={handleShowMore}
                >
                    {listIsActive ? "- Show less" : "+ Show more"}
                </button>
            )}

            <ul
                className="max-h-28 overflow-hidden flex flex-col gap-1 transition-[max-height] duration-500 ease-[ease]"
                ref={listRef}
            >
                {items.map((item) => (
                    <li className="flex items-center select-none" key={item.label}>
                        <FilterCheckbox label={paramLabel} value={item.label} onChange={onChange} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default FilterDropdown
