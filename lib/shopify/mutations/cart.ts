import { cartFragment } from "../fragments/cart"

export const createCartMutation = `
    mutation ($input:CartInput, $sortKey: OrderSortKeys = ID) {
        cartCreate(input:$input) {
            cart {
                ... cartItem
            }
        }
    }
    ${cartFragment}
`

export const changeCartItemQuantityMutation = `
    mutation ($cartId:ID!, $lines:[CartLineUpdateInput!]!, $sortKey: OrderSortKeys = ID) {
        cartLinesUpdate(cartId:$cartId, lines:$lines) {
            cart {
                ... cartItem
            }
        }
    }
    ${cartFragment}
`

export const removeItemsFromCartMutation = `
    mutation ($cartId:ID!, $lineIds:[ID!]!, $sortKey: OrderSortKeys = ID) {
        cartLinesRemove(cartId:$cartId, lineIds: $lineIds) {
            cart {
                ... cartItem
            }
            userErrors {
                ... on CartUserError {
                    message
                    field 
                }
            }
        }
    },
    ${cartFragment}
`

export const addItemToCartMutation = `
    mutation ($lines:[CartLineInput!]!, $cartId:ID!, $sortKey: OrderSortKeys = ID) {
        cartLinesAdd(lines:$lines, cartId:$cartId) {
            cart {
                ... cartItem
            }
            userErrors {
                ... on CartUserError {
                    message
                    field 
                }
            }
        }
    },
    ${cartFragment}
`

export const updateBuyerIdentityMutation = `
    mutation ($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!, $sortKey: OrderSortKeys = ID) {
        cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
            cart {
                ... cartItem
            }
            userErrors {
                ... on CartUserError {
                    message
                    field 
                }
            }
        }
    }
    ${cartFragment}
`