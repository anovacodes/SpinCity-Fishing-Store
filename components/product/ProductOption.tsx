"use client"

import { COLORS } from "@/utils/filters-data"
import type { Option, ProductVariantSelectedOptions } from "@/lib/shopify/types"
import type { FC } from "react"

export type SelectedOption = {
    name: string
    value: string
}

interface ProductOptionProps {
    option: Option
    activeOptions: ProductVariantSelectedOptions[]
    onClick: (activeOptions: Array<ProductVariantSelectedOptions>) => void
}

const ProductOption: FC<ProductOptionProps> = ({ option, onClick, activeOptions }) => {
    const handleClick = (selectedOption: ProductVariantSelectedOptions) => {
        const optionsWithoutCurrentOption = activeOptions.filter((opt) => {
            return opt.name !== selectedOption.name
        })

        onClick([...optionsWithoutCurrentOption, selectedOption])
    }

    const checkIfOptionIsActive = (option: ProductVariantSelectedOptions): boolean => {
        const optionExistsInActive = activeOptions.find((opt) => {
            if (opt.name === option.name && opt.value === option.value) {
                return opt
            }
        })

        if (optionExistsInActive) {
            return true
        }

        return false
    }

    return (
        <>
            {option.name.toLowerCase() === "color" ? (
                <div key={option.id}>
                    <h5 className="text-lg font-medium text-neutral-700 mb-3">{option.name}</h5>
                    <div className="flex items-center flex-wrap gap-[10px]">
                        {option.values.map((value) => {
                            const isActiveOption = checkIfOptionIsActive({
                                name: option.name,
                                value
                            })

                            return COLORS.map((color) => {
                                if (value != color.label) {
                                    return null
                                }

                                return (
                                    <span
                                        key={value}
                                        style={{
                                            backgroundColor: `${color.color}`
                                        }}
                                        className={`
                                            text-transparent
                                            w-[20px]
                                            h-[20px]
                                            inline-block
                                            ${isActiveOption ? "scale-75" : "scale-100"}
                                            shadow-[0_0_6px_rgba(0,0,0,0.3)]             
                                            rounded-full
                                            transition-all
                                            select-none
                                            cursor-pointer
                                        `}
                                        onClick={() =>
                                            handleClick({
                                                name: option.name,
                                                value
                                            })
                                        }
                                    >
                                        {value}
                                    </span>
                                )
                            })
                        })}
                    </div>
                </div>
            ) : (
                <div key={option.id}>
                    <h5 className="text-lg font-medium text-neutral-700 mb-3">{option.name}</h5>
                    <div className="flex items-center flex-wrap gap-[10px]">
                        {option.values.map((value) => {
                            const isActiveOption = checkIfOptionIsActive({
                                name: option.name,
                                value
                            })

                            return (
                                <span
                                    key={value}
                                    className={`
                                        text-base 
                                        py-1 
                                        px-3 
                                    ${isActiveOption ? "bg-neutral-700 text-white" : "bg-neutral-200 text-neutral-700"}
                                        rounded-md 
                                    text-neutral-700
                                    hover:text-white 
                                    hover:bg-neutral-700
                                        transition-colors
                                        select-none
                                        cursor-pointer
                                    `}
                                    onClick={() =>
                                        handleClick({
                                            name: option.name,
                                            value
                                        })
                                    }
                                >
                                    {value}
                                </span>
                            )
                        })}
                    </div>
                </div>
            )}
        </>
    )
}

export default ProductOption
