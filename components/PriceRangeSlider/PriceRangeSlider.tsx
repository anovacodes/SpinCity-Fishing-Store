"use client"

import "./style.css"

import ReactSlider from "react-slider"
import { FC, useEffect, useState } from "react"

export type PriceRange = {
    min: number
    max: number
}

interface PriceRangeSliderProps {
    start: [number, number]
    range: PriceRange
    step: number
    onChange: (prices: PriceRange) => void
}

const PriceRangeSlider: FC<PriceRangeSliderProps> = ({ start, range, step, onChange }) => {
    const [price, setPrice] = useState([start[0], start[1]])
    const [wasUserInput, setWasUserInput] = useState(false)

    useEffect(() => {
        if (wasUserInput) {
            onChange({
                min: price[0],
                max: price[1]
            })
        }
    }, [onChange, price, wasUserInput])

    function handleThumbChange(values: Array<number>) {
        if (!wasUserInput) {
            setWasUserInput(true)
        }

        setPrice(values)
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>, position: number) {
        if (!wasUserInput) {
            setWasUserInput(true)
        }

        const newPrice = [...price]

        newPrice[position] = Number(event.target.value)

        setPrice(newPrice)
    }

    return (
        <div>
            <div className="price-range-slider">
                <ReactSlider
                    defaultValue={start}
                    value={price}
                    onChange={handleThumbChange}
                    min={range.min}
                    max={range.max}
                    step={step}
                    pearling={true}
                />
            </div>

            <div className="mt-5 flex items-center">
                <span className="text-neutral-500 mr-3 hidden sm:inline">Price:</span>
                <input
                    className="
                        w-20
                        outline-none
                        py-1
                        px-3
                        text-center
                        text-neutral-500
                        border
                        border-neutral-200
                        rounded-lg
                    "
                    type="number"
                    name="min"
                    min={range.min}
                    max={range.max}
                    value={price[0]}
                    onChange={(event) => handleInputChange(event, 0)}
                />
                <span className="text-neutral-500 mx-2">-</span>
                <input
                    className="
                        w-20
                        outline-none
                        py-1
                        px-3
                        text-center
                        text-neutral-500
                        border
                        border-neutral-200
                        rounded-lg
                    "
                    type="number"
                    name="max"
                    min={range.min}
                    max={range.max}
                    value={price[1]}
                    onChange={(event) => handleInputChange(event, 1)}
                />
            </div>
        </div>
    )
}

export default PriceRangeSlider
