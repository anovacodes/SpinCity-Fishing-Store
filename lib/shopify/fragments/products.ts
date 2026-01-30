import { imageFragment } from "./image"
import { priceRangeFragment } from "./priceRange"

export const productEdgeFragment = `
    fragment productEdgeItem on ProductEdge {
        cursor
        node {
            id
            handle
            title
            compareAtPriceRange {
                ... priceRangeItem
            }
            priceRange {
                ... priceRangeItem
            }
            featuredImage {
                ... imageItem
            }
            metafields(identifiers: $identifiers) {
                key
                value
            }
        }
    }
    ${imageFragment}
    ${priceRangeFragment}
`

export const productFragment = `
    fragment fullProductItem on Product {
        availableForSale
        id
        handle
        title
        options(first:3) {
            id
            name
            values
        }
        description
        descriptionHtml
        collections(first:5) {
            nodes {
                id
                handle
                title
                products(first: 7) {
                    nodes {
                        handle
                        title
                    }
                }
            }
        }
        featuredImage {
            ... imageItem
        }
        images(first: $imagesLimit) {
            nodes {
                ... imageItem
            }
        }
        compareAtPriceRange {
            ... priceRangeItem
        }
        priceRange {
            ... priceRangeItem
        }
        metafields(identifiers:$identifiers) {
            key
            value
        }
        variants(first:100) {
            nodes {
                id
                price {
                    amount
                    currencyCode
                }
                compareAtPrice {
                    amount
                    currencyCode
                }
                selectedOptions {
                    name
                    value
                }
            }
        }
    }
    ${imageFragment}
    ${priceRangeFragment}
`