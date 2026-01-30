import { menuItemFragment } from "../fragments/menu"

export const menuQuery = `
    query ($handle:String!) {
        menu(handle:$handle) {
            items {
                ... menuItem
            }
        }
    }
    ${menuItemFragment}
`

export const footerMenuQuery = `
    query ($handle:String!) {
        menu(handle:$handle) {
            items {
                ... menuItem
                items {
                    ... menuItem
                }
            }
        }
    }
    ${menuItemFragment}
`