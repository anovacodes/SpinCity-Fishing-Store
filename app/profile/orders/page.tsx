import getCurrentUser from "@/actions/auth/getCurrentUser"
import { reReceiveCustomer } from "@/actions/shopify/auth/reReceiveCustomer"
import Orders from "@/components/Orders"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Orders"
}

const OrdersPage = async () => {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return null
    }

    const customerWithUpdatedOrders = await reReceiveCustomer(currentUser)

    const orders = customerWithUpdatedOrders?.orders.nodes
    const reversedOrders = orders?.reverse()

    return <Orders orders={reversedOrders} />
}

export default OrdersPage
