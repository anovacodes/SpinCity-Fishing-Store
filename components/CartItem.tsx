import Link from "next/link"
import type { FC } from "react"
import { IoClose } from "react-icons/io5"
import Image from "next/image"
import type { CartLinesNode, CartLineUpdateInput } from "@/lib/shopify/types"
import Counter from "./UI/Counter"
import { formatCurrency } from "@/utils/utils"

interface CartItemProps {
    node: CartLinesNode
    isLoading: boolean
    removeFromCart: (lineIds: string[]) => Promise<void>
    changeQuantity: ({ id, quantity }: CartLineUpdateInput) => Promise<void>
}

const CartItem: FC<CartItemProps> = ({ node, isLoading, removeFromCart, changeQuantity }) => {
    const { id, quantity, merchandise, cost } = node

    const price = formatCurrency(cost.totalAmount.amount, cost.totalAmount.currencyCode)

    return (
        <div className="md:h-36 grid grid-cols-1 md:grid-cols-[1fr_3fr_6fr_3fr_200px_3fr] gap-8 p-4 border border-neutral-200 rounded-lg">
            <div className="flex items-center md:justify-center justify-end">
                <button
                    className="block text-neutral-700 hover:text-neutral-400 transition-colors"
                    type="button"
                    onClick={async () => await removeFromCart([node.id])}
                >
                    <IoClose size="28" />
                </button>
            </div>

            <div className="h-64 md:h-full  bg-white">
                <Link
                    className="relative h-full flex items-center justify-center"
                    href={`/products/${merchandise.product.handle}`}
                >
                    <Image
                        className="object-contain h-full max-w-full"
                        src={merchandise.image.url}
                        fill
                        sizes="100%"
                        alt={merchandise.product.title}
                        priority={true}
                    />
                </Link>
            </div>

            <div className="flex items-center">
                <Link
                    className="text-lg text-neutral-700 hover:text-neutral-400 transition-colors line-clamp-2"
                    href={`/products/${merchandise.product.handle}`}
                >
                    <h3>{merchandise.product.title}</h3>
                </Link>
            </div>

            <ul className="flex flex-col justify-center items-center">
                {merchandise.selectedOptions.map((option) => (
                    <li className="flex items-center gap-2" key={option.name}>
                        <span className=" text-neutral-700">{option.name}: </span>
                        <span className="text-neutral-500">{option.value}</span>
                    </li>
                ))}
            </ul>

            <div className="flex items-center justify-center">
                <Counter quantity={quantity} id={id} onChange={changeQuantity} isLoading={isLoading} />
            </div>

            <div className="text-lg text-neutral-700 flex items-center justify-center">
                <span>{price}</span>
            </div>
        </div>
    )
}

export default CartItem
