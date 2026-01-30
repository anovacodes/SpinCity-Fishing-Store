import { customerFragment } from "../fragments/customer"

export const customerQuery = `
    query ($customerAccessToken:String!, $sortKey: OrderSortKeys = ID) {
        customer(customerAccessToken:$customerAccessToken) {
            ... customerItem
        }
    }
    ${customerFragment}
`