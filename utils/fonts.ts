import { Poppins, Roboto } from "next/font/google"

export const poppins = Poppins({
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500", "600", "700"],
    preload: true
})

export const roboto = Roboto({
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500"],
    preload: true
})