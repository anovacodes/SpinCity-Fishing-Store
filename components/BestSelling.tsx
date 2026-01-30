import type { FC } from "react"
import Products from "./product/Products"
import { getProducts } from "@/actions/shopify/getProducts"
import { productsQuery } from "@/lib/shopify/queries/products"
import { bestSellingVariables } from "@/lib/shopify/variables"
import { STORE_SETTINGS } from "@/config/settings.config"
import type { CurrentUser } from "@/actions/auth/getCurrentUser"
import Section from "./Section"

interface BestSellingProps {
    currentUser?: CurrentUser
}

const BestSelling: FC<BestSellingProps> = async ({ currentUser }) => {
    const productsEdges = await getProducts(productsQuery, bestSellingVariables())

    return (
        <Section title="Best selling">
            <Products
                type="best-selling"
                productsEdges={productsEdges}
                itemsPerPage={STORE_SETTINGS.bestSellingCount}
                variables={bestSellingVariables()}
                currentUser={currentUser}
            />
        </Section>
    )
}

export default BestSelling
