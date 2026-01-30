import { cartFragment } from "../fragments/cart"

export const cartQuery = `
    query ($id:ID!, $sortKey: OrderSortKeys = ID) {
        cart(id:$id) {
            ... cartItem
        }
    }
    ${cartFragment}
`