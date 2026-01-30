import type { FC } from "react"

interface OrderItemProps {
    id: string
    title: string
    quantity: number
    price: string | null
    date: string
}

const OrderItem: FC<OrderItemProps> = ({
    id,
    title,
    quantity,
    price,
    date
}) => {
    return (
        <div
            className="
                grid
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-[1fr_3fr_3fr_3fr_3fr]
                gap-4
                border-2
                border-neutral-200
                rounded-lg
                p-4
            "
        >
            <div className="flex flex-col gap-3">
                <h5 className="tex-lg font-semibold text-neutral-700">ID</h5>
                <p>{id}</p>
            </div>

            <div className="flex flex-col gap-3">
                <h5 className="tex-lg font-semibold text-neutral-700">Title</h5>
                <p>{title}</p>
            </div>

            <div className="flex flex-col gap-3">
                <h5 className="tex-lg font-semibold text-neutral-700">
                    Quantity
                </h5>
                <p>{quantity}</p>
            </div>

            <div className="flex flex-col gap-3">
                <h5 className="tex-lg font-semibold text-neutral-700">Price</h5>
                <p>{price || "$0"}</p>
            </div>

            <div className="flex flex-col gap-3">
                <h5 className="tex-lg font-semibold text-neutral-700">Date</h5>
                <p>{date}</p>
            </div>
        </div>
    )
}

export default OrderItem
