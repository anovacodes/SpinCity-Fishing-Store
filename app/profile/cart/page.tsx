import getCurrentUser from "@/actions/auth/getCurrentUser"
import Cart from "@/components/Cart"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Cart"
}

const CartPage = async () => {
    const currentUser = await getCurrentUser()

    return <Cart currentUser={currentUser} />
}

export default CartPage
