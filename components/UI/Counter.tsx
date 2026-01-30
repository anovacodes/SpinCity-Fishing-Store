"use client"

import type { CartLineUpdateInput } from "@/lib/shopify/types"
import { ChangeEvent, FC, useState } from "react"

interface CounterProps {
    id: string
    quantity: number
    onChange: ({ id, quantity }: CartLineUpdateInput) => void
    isLoading: boolean
}

const Counter: FC<CounterProps> = ({ id, quantity, onChange, isLoading }) => {
    const [value, setValue] = useState(quantity)

    const increaseValue = () => {
        if (isLoading) return

        setValue((prev) => prev + 1)
        onChange({ id, quantity: value + 1 })
    }

    const decreaseValue = () => {
        if (isLoading) return

        setValue((prev) => {
            if (prev > 1) {
                return prev - 1
            }

            return prev
        })

        if (value > 1) {
            onChange({ id, quantity: value - 1 })
        }
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (isLoading) return

        const value = Number(event.target.value)

        if (value >= 1) {
            setValue(value)
            onChange({ id, quantity: value })
        }
    }

    return (
        <form className="flex h-10">
            <button
                disabled={isLoading}
                className="block w-10 text-xl text-neutral-700 hover:bg-neutral-300 transition-colors font-medium bg-neutral-200 rounded-lg rounded-r-none select-none disabled:bg-neutral-100 disabled:text-neutral-400 disabled:cursor-not-allowed"
                onClick={decreaseValue}
                type="button"
            >
                -
            </button>

            <input
                disabled={isLoading}
                className="block max-w-[120px] text-center px-8 border border-neutral-200 border-l-0 border-r-0 outline-none focus:border-neutral-200 disabled:text-neutral-400 disabled:border-neutral-50"
                type="text"
                value={value}
                name="quantity"
                onChange={handleInputChange}
            />

            <button
                disabled={isLoading}
                className="block w-10 text-xl text-neutral-700 hover:bg-neutral-300 transition-colors font-medium bg-neutral-200 rounded-lg rounded-l-none select-none disabled:bg-neutral-100 disabled:text-neutral-400 disabled:cursor-not-allowed"
                onClick={increaseValue}
                type="button"
            >
                +
            </button>
        </form>
    )
}

export default Counter
