export const customerFragment = `
    fragment customerItem on Customer {
        id
        email
        acceptsMarketing
        displayName
        firstName
        lastName
        numberOfOrders
        phone
        orders(first:100, sortKey:$sortKey) {
            totalCount
            nodes {
                id
                name
                orderNumber
                statusUrl
                processedAt
                totalPrice {
                    amount
                    currencyCode
                }
                lineItems(first:100) {
                    nodes {
                        title
                        currentQuantity
                        quantity
                    }
                }
            }
        }
        createdAt
        updatedAt
    }
`