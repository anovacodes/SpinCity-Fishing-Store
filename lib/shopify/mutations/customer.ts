import { customerFragment } from "../fragments/customer"

export const customerCreateMutation = `
    mutation ($input: CustomerCreateInput!, $sortKey: OrderSortKeys = ID) {
        customerCreate(input:$input) {
            customer {
                ... customerItem
            }
            customerUserErrors {
                message
            }
        }
    }
    ${customerFragment}
`

export const customerAccessTokenCreateMutation = `
    mutation ($input:CustomerAccessTokenCreateInput!) {
        customerAccessTokenCreate(input:$input) {
            customerAccessToken {
                accessToken
                expiresAt
            }
            customerUserErrors {
                message
            }
        }
    }
`

export const customerUpdateMutation = `
    mutation ($customerAccessToken:String!, $customer: CustomerUpdateInput!, $sortKey: OrderSortKeys = ID) {
        customerUpdate(customerAccessToken:$customerAccessToken, customer:$customer) {
            customer {
                ... customerItem
            }
            customerAccessToken {
                accessToken
                expiresAt
            }
            customerUserErrors {
                message
            }
        }
    }
    ${customerFragment}
`

export const customerRecoverMutation = `
    mutation ($email: String!) {
        customerRecover (email: $email) {
            customerUserErrors {
                message 
            }
        }
    }
`

export const customerResetMutation = `
    mutation ($id: ID!, $input: CustomerResetInput!, $sortKey: OrderSortKeys = ID) {
        customerReset(id: $id, input: $input) {
            customer {
                ... customerItem
            }
            customerAccessToken {
                accessToken
                expiresAt
            }
            customerUserErrors {
                message
            }
        }
    }
    ${customerFragment}
`