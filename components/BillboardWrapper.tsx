import { getBillboards } from "@/actions/shopify/getBillboards"
import SoloBillboard from "./SoloBillboard"
import Hero from "./Hero"
import type { FC } from "react"

interface BillboardWrapperProps {
    handle: "billboard-hero" | "billboard-middle"
}

const BillboardWrapper: FC<BillboardWrapperProps> = async ({ handle }) => {
    const billboards = await getBillboards(handle)

    if (handle === "billboard-middle") {
        return <SoloBillboard billboards={billboards} />
    }

    return <Hero billboards={billboards} />
}

export default BillboardWrapper

