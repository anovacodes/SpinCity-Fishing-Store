"use client"

import { FC, useState } from "react"
import xss from "xss"

interface ProductDescriptionProps {
    html?: string
}

const ProductDescription: FC<ProductDescriptionProps> = ({ html }) => {
    const [isActiveDescription, setIsActiveDescription] = useState(() => {
        if (html && html.length < 500) {
            return true
        }

        return false
    })

    return (
        <div
            className={`
            relative
            overflow-hidden
            mb-8
            transition-all
            ${isActiveDescription ? "max-h-none after:opacity-0 after:-z-10" : "max-h-60 after:opacity-1 after:z-10"}
            after:block
            after:absolute
            after:inset-0
            after:top-auto
            after:w-full
            after:h-[150px]
            after:bg-gradient-to-t
            after:from-white
            after:to-[rgba(0, 0, 0, 0)]
            after:transition-opacity
        `}
        >
            <h2 className="text-xl font-semibold text-neutral-600 mb-8">Description</h2>
            <div
                className="cms-editor"
                dangerouslySetInnerHTML={{
                    __html: xss(html || "No description")
                }}
            ></div>
            <button
                className={`
                    text-base
                    font-medium
                    text-rose-500
                    hover:text-rose-300
                    transition-colors
                    absolute
                    left-0
                    -bottom-1
                    z-20
                    ${!isActiveDescription ? "block" : "hidden"}
                `}
                onClick={() => setIsActiveDescription(true)}
            >
                Show more
            </button>
        </div>
    )
}

export default ProductDescription
