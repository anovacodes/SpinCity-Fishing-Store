import type {
    AvailabilityFilter,
    BoatSizesFilter,
    BrandsFilter,
    ColorsFilter,
    HookSizesFilter,
    LineSizesFilter,
    LureLengthFilter,
    MaterialsFilter,
    ReelSizesFilter,
    RodLengthFilter,
    WeightsFilter
} from "@/lib/shopify/types"

export const BRANDS: BrandsFilter[] = [
    { label: "Daiwa" },
    { label: "Favorite" },
    { label: "Fanatik" },
    { label: "Kolibri" },
    { label: "Select" },
    { label: "Shimano" },
    { label: "Sunline" }
]

export const COLORS: ColorsFilter[] = [
    { label: "Red", color: "#e11d48" },
    { label: "White", color: "#fff" },
    { label: "Black", color: "#404040" },
    { label: "Yellow", color: "#facc15" },
    { label: "Orange", color: "#f97316" },
    { label: "Green", color: "#22c55e" }
]

export const MATERIALS: MaterialsFilter[] = [{ label: "Wood" }, { label: "Metal" }, { label: "Stone" }]

export const REEL_SIZES: ReelSizesFilter[] = [
    { label: "1000" },
    { label: "2000" },
    { label: "2500" },
    { label: "3000" },
    { label: "4000" },
    { label: "5000" },
    { label: "6000" },
    { label: "7000" },
    { label: "8000" },
    { label: "9000" },
    { label: "10000" }
]

export const LINE_SIZES: LineSizesFilter[] = [
    { label: "0.06" },
    { label: "0.08" },
    { label: "0.1" },
    { label: "0.12" },
    { label: "0.16" },
    { label: "0.2" },
    { label: "0.24" },
    { label: "0.32" },
    { label: "0.48" }
]

export const BOAT_SIZES: BoatSizesFilter[] = [
    { label: "S" },
    { label: "M" },
    { label: "L" },
    { label: "XL" },
    { label: "2XL" }
]

export const HOOK_SIZES: HookSizesFilter[] = [
    { label: "2/0" },
    { label: "1/0" },
    { label: "1" },
    { label: "2" },
    { label: "3" },
    { label: "4" },
    { label: "8" }
]

export const WEIGHTS: WeightsFilter[] = [
    { label: "1.5g" },
    { label: "2g" },
    { label: "3g" },
    { label: "5g" },
    { label: "8g" },
    { label: "14g" },
    { label: "24g" }
]

export const ROD_LENGTH: RodLengthFilter[] = [{ label: "1.90" }, { label: "2.10" }, { label: "2.40" }]

export const LURE_LENGTH: LureLengthFilter[] = [
    { label: '2.5"' },
    { label: '2.8"' },
    { label: '3"' },
    { label: '3.5"' },
    { label: '4"' }
]

export const AVAILABILITY: AvailabilityFilter[] = [
    { label: "Available", value: true },
    { label: "Not available", value: false }
]
