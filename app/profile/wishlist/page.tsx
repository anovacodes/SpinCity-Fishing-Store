import getCurrentUser from "@/actions/auth/getCurrentUser"
import { getProduct } from "@/actions/shopify/getProduct"
import EmptyState from "@/components/UI/EmptyState"
import Wishlist from "@/components/Wishlist"
import { Product, ProductsEdge } from "@/lib/shopify/types"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Wishlist"
}

const WishlistPage = async () => {
    const currentUser = await getCurrentUser()

    if (!currentUser) return null

    const { wishlist } = currentUser

    if (!wishlist) {
        return <EmptyState title="No products found :)" />
    }

    const requests = wishlist.productHandles.map((slug) => getProduct(slug))

    const products: Array<Product | null> = await Promise.all(requests)

    const productsEdgesNotFiltered: Array<ProductsEdge | null> = products.map((product) => {
        if (!product) {
            return null
        }

        return {
            cursor: "",
            node: product
        }
    })

    const productsEdges = productsEdgesNotFiltered.filter((edge): edge is ProductsEdge => (edge ? true : false))

    return <Wishlist currentUser={currentUser} productsEdges={productsEdges} />
}

export default WishlistPage
