import { productEdgeFragment, productFragment } from "../fragments/products"

export const productsFromCollectionQuery = `
    query (
        $handle:String, 
        $first:Int, 
        $filters:[ProductFilter!],
        $identifiers:[HasMetafieldsIdentifier!]!,
        $after:String 
    ) {
        collection(handle:$handle) {
            products(first:$first, after:$after, filters:$filters) {
                edges {
                    ... productEdgeItem
                }
            }
        }
    }
    ${productEdgeFragment}
`
export const productsQuery = `
    query (
        $first:Int, 
        $sortKey:ProductSortKeys = ID,
        $identifiers:[HasMetafieldsIdentifier!]!,
        $after:String
    ) {
        products(first:$first, sortKey:$sortKey, after:$after) {
            edges {
                ... productEdgeItem
            }
        }
    }
    ${productEdgeFragment}
`

export const productsHandlesQuery = `
    query ($first: Int){
        products (first: $first) {
            edges {
                node {
                    handle
                    updatedAt
                }
            }
        }
    }
`

export const productQuery = `
    query (
        $handle:String,
        $imagesLimit:Int,
        $identifiers: [HasMetafieldsIdentifier!]!
    ) {
        product(handle:$handle) {
            ... fullProductItem
        }
    }
    ${productFragment}
`

export const productRecommendations = `
    query (
        $productId:ID!,
        $imagesLimit:Int,
        $identifiers: [HasMetafieldsIdentifier!]!
    ) {
        productRecommendations(productId:$productId) {
            ... fullProductItem
        }
    }
    ${productFragment}
`