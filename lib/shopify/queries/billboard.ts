export const billboardQuery = `
    query ($handle:String!) {
        blog(handle:$handle) {
            articles(first:10) {
                nodes {
                    id
                    handle
                    title
                    content
                    contentHtml
                    publishedAt
                    image {
                        width
                        height
                        altText
                        url
                    }
                }
            }
        }
    }
`