import type { FilterItems } from "@/lib/shopify/types"
import {
    AVAILABILITY,
    BOAT_SIZES,
    BRANDS,
    COLORS,
    HOOK_SIZES,
    LINE_SIZES,
    LURE_LENGTH,
    MATERIALS,
    REEL_SIZES,
    ROD_LENGTH,
    WEIGHTS
} from "./filters-data"
import { clsx, ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs))
}

export const formatCurrency = (price?: string, currency?: string, locale: string = "en-US") => {
    if (!price || !currency) return null

    const formatted = new Intl.NumberFormat(locale, {
        style: "currency",
        currency
    }).format(Number(price))

    return formatted
}

export const getCollectionFilters = (collectionHandle: string): FilterItems => {
    let filterItems: FilterItems = []

    switch (collectionHandle) {
        case "fishing-rods":
            filterItems = [
                { label: "Brand", items: BRANDS },
                { label: "Color", items: COLORS },
                { label: "Length", items: ROD_LENGTH },
                { label: "Material", items: MATERIALS },
                { label: "Ready for sale", items: AVAILABILITY }
            ]

            break
        case "fishing-reels":
            filterItems = [
                { label: "Brand", items: BRANDS },
                { label: "Color", items: COLORS },
                { label: "Size", items: REEL_SIZES },
                { label: "Material", items: MATERIALS },
                { label: "Ready for sale", items: AVAILABILITY }
            ]

            break
        case "line":
            filterItems = [
                { label: "Brand", items: BRANDS },
                { label: "Size", items: LINE_SIZES },
                { label: "Color", items: COLORS },
                { label: "Ready for sale", items: AVAILABILITY }
            ]

            break
        case "weights":
            filterItems = [
                { label: "Brand", items: BRANDS },
                { label: "Color", items: COLORS },
                { label: "Weight", items: WEIGHTS },
                { label: "Ready for sale", items: AVAILABILITY }
            ]

            break
        case "hooks":
            filterItems = [
                { label: "Brand", items: BRANDS },
                { label: "Color", items: COLORS },
                { label: "Size", items: HOOK_SIZES },
                { label: "Ready for sale", items: AVAILABILITY }
            ]

            break
        case "lures":
            filterItems = [
                { label: "Brand", items: BRANDS },
                { label: "Color", items: COLORS },
                { label: "Length", items: LURE_LENGTH },
                { label: "Ready for sale", items: AVAILABILITY }
            ]

            break
        case "boats":
            filterItems = [
                { label: "Brand", items: BRANDS },
                { label: "Color", items: COLORS },
                { label: "Size", items: BOAT_SIZES },
                { label: "Material", items: MATERIALS },
                { label: "Ready for sale", items: AVAILABILITY }
            ]

            break
        default:
            filterItems = [
                { label: "Brand", items: BRANDS },
                { label: "Ready for sale", items: AVAILABILITY }
            ]
    }

    return filterItems
}

export const compareTwoArraysOfObjects = (firstArray: any, secondArray: any): boolean => {
    return (
        firstArray.length === secondArray.length &&
        firstArray.every((item1: any) =>
            secondArray.some((item2: any) => Object.keys(item1).every((key) => item1[key] === item2[key]))
        )
    )
}

export const calculateDiscount = (maxVariantOldPrice: number, minVariantPrice: string): number => {
    if (maxVariantOldPrice <= 0) return 0

    const lowerPrice = Number(minVariantPrice)
    const biggerPrice = maxVariantOldPrice

    const discount = Math.ceil(100 - (lowerPrice * 100) / biggerPrice)

    return discount
}

export const convertMetafieldLabelToReadableFormat = (key: string): string => {
    const convertedLabelParts = key.split("_").map((label) => {
        const str = `${label[0].toUpperCase()}${label.slice(1)}`

        return str
    })

    const label = convertedLabelParts.join(" ")

    return label
}

export const shortenText = (text: string = "", maxReturnLength: number): string => {
    const shortText = text.length > maxReturnLength ? `${text.substring(0, maxReturnLength)}...` : text

    return shortText
}
