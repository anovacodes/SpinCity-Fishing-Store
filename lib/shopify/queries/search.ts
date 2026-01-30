export const searchQuery = `
    query ($first:Int, $query:String!) {
        search(first:$first, query:$query) {
            totalCount
                nodes {
                ... on Product {
                    id
                    handle
                    title
                    description
                    featuredImage {
                        width
                        height
                        url
                        altText
                    }
                }
            }
        }
    }
`