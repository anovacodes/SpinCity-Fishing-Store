"use client"

import type { ReviewSchema } from "@/lib/zod/types"
import { FC, Fragment } from "react"
import { UseFormRegister } from "react-hook-form"
import { IoStar } from "react-icons/io5"

type Value = {
    value: number
    name: "rating"
    checked: boolean
}

const VALUES: Array<Value> = [
    { value: 5, name: "rating", checked: false },
    { value: 4, name: "rating", checked: false },
    { value: 3, name: "rating", checked: true },
    { value: 2, name: "rating", checked: false },
    { value: 1, name: "rating", checked: false }
]

interface StarRatingProps {
    register?: UseFormRegister<ReviewSchema>
    starSize: number
    id: string
    rating?: number
}

const StarRating: FC<StarRatingProps> = ({ register, starSize, id, rating }) => {
    return (
        <div className="text-neutral-300">
            {register ? (
                <div className="relative flex flex-row-reverse items-center justify-end">
                    {VALUES.map((value, index) => (
                        <Fragment key={value.value}>
                            <input
                                className="peer/input absolute top-0 left-0 invisible opacity-0"
                                type="radio"
                                {...register("rating")}
                                value={value.value}
                                id={`${id}-${index}`}
                            />

                            <label
                                className="peer/label peer-checked/input:text-rose-600 peer-hover/input:text-rose-600 md:peer-hover/input:text-rose-300 peer-hover/label:text-rose-300 hover:text-rose-300  cursor-pointer px-[5px] first-of-type:pr-0 last-of-type:pl-0 transition-colors"
                                htmlFor={`${id}-${index}`}
                            >
                                <IoStar size={starSize} />
                            </label>
                        </Fragment>
                    ))}
                </div>
            ) : (
                <div className="relative flex flex-row-reverse items-center justify-end">
                    {VALUES.map((value, index) => {
                        if (typeof rating !== "number") return null

                        const isChecked = rating >= 5 - index

                        return (
                            <Fragment key={value.value}>
                                <input
                                    className="peer/input absolute top-0 left-0 invisible opacity-0"
                                    type="radio"
                                    value={value.value}
                                    checked={isChecked}
                                    id={`${id}-${index}`}
                                    readOnly
                                />

                                <label
                                    className=" peer-checked/input:text-rose-600 px-[2.5px] first-of-type:pr-0 last-of-type:pl-0 transition-colors"
                                    htmlFor={`${id}-${index}`}
                                >
                                    <IoStar size={starSize} />
                                </label>
                            </Fragment>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default StarRating
