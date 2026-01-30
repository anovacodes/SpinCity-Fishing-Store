import { customerFragment } from "./customer"

export const cartFragment = `
    fragment cartItem on Cart {
        id
        checkoutUrl
        buyerIdentity {
            customer {
                ... customerItem
            }
        }
        createdAt
        updatedAt
        note
        totalQuantity
        cost {
            totalAmount {
                amount
                currencyCode
            }
        }
        lines(first:100) {
            nodes {
                id
                quantity
                merchandise {
                    ... on ProductVariant {
                        product {
                            title
                            handle
                            id
                        }
                        id
                        image {
                            url
                            height
                            width
                            altText
                        }
                        selectedOptions {
                            name
                            value
                        }
                        price {
                            amount
                            currencyCode
                        }
                    }
                }
                cost {
                    amountPerQuantity {
                        amount
                        currencyCode
                    }
                    totalAmount {
                        amount
                        currencyCode
                    }
                }
            }
        }
    }
    ${customerFragment}
`