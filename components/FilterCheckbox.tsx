"use client"

import { FC, useRef } from "react"

interface FilterCheckboxProps {
    label: string
    value: string
    onChange: (
        label: string,
        value: string,
        checkbox: HTMLInputElement | null
    ) => void
}

const FilterCheckbox: FC<FilterCheckboxProps> = ({
    label,
    value,
    onChange
}) => {
    const checkboxRef = useRef<HTMLInputElement>(null)

    return (
        <>
            <div className="flex items-center justify-center">
                <input
                    className="
                        appearance-none 
                        relative 
                        w-4 
                        h-4 
                        border 
                        border-neutral-300 
                        rounded-[3px] 
                        cursor-pointer 
                        checked:before:scale-75 
                        before:w-3 
                        before:h-3 
                        before:bg-rose-600 
                        before:absolute 
                        before:-inset-[1px] 
                        before:top-1/2 
                        before:left-1/2 
                        before:-translate-x-1/2 
                        before:-translate-y-1/2 
                        before:rounded-sm 
                        before:scale-0 
                        before:transition-transform
                        before:duration-200
                    "
                    type="checkbox"
                    id={value}
                    ref={checkboxRef}
                    onChange={() => onChange(label, value, checkboxRef.current)}
                />
            </div>

            <label
                className="pl-3 cursor-pointer text-neutral-600 whitespace-nowrap hover:opacity-75 transition-opacity"
                htmlFor={value}
            >
                {value}
            </label>
        </>
    )
}

export default FilterCheckbox
