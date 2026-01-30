"use client"

import type { FC } from "react"
import type { CurrentUser } from "@/actions/auth/getCurrentUser"
import type { ProductsEdge } from "@/lib/shopify/types"
import Products from "./product/Products"

interface WishlistProps {
    currentUser?: CurrentUser
    productsEdges: ProductsEdge[]
}

const Wishlist: FC<WishlistProps> = ({ currentUser, productsEdges }) => {
    return <Products productsEdges={productsEdges} itemsPerPage={99} type="wishlist" currentUser={currentUser} />
}

export default Wishlist
