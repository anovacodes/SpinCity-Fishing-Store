import EmptyState from "./UI/EmptyState"
import OrderItem from "./OrderItem"
import type { FC } from "react"
import { Order } from "@/lib/shopify/types"
import { format } from "date-fns"
import { formatCurrency } from "@/utils/utils"

interface OrdersProps {
    orders?: Order[]
}

const Orders: FC<OrdersProps> = ({ orders = [] }) => {
    if (!orders || !orders.length) {
        return <EmptyState title="You haven't done any orders yet" />
    }

    return (
        <ul className="grid grid-cols-1 gap-4">
            {orders.map((order) => {
                const quantity = order.lineItems.nodes.reduce((sum, item) => {
                    return sum + item.quantity
                }, 0)

                const formattedPrice = formatCurrency(order.totalPrice.amount, order.totalPrice.currencyCode)

                return (
                    <li key={order.id}>
                        <OrderItem
                            id={order.name}
                            title={`${order.lineItems.nodes[0].title.slice(0, 20)}...`}
                            quantity={quantity}
                            price={formattedPrice}
                            date={format(new Date(order.processedAt), "dd.MM.yyyy")}
                        />
                    </li>
                )
            })}
        </ul>
    )
}

export default Orders
