import { imageFragment } from "../fragments/image"
import { pageInfoFragment } from "../fragments/page"

export const articlesQuery = `
    query (
        $first:Int, 
        $handle:String, 
        $sortKey:ArticleSortKeys=ID,
        $after:String
    ) {
        blog(handle:$handle) {
            articles(first:$first, sortKey:$sortKey, after:$after) {
                pageInfo {
                    ... pageInfo
                }
                edges {
                    cursor 
                    node {
                        id
                        handle
                        title
                        content
                        publishedAt
                        image {
                            ... imageItem
                        }
                    }
            }
            }
        }
    }
    ${imageFragment}
    ${pageInfoFragment}
`

export const articlesHandlesQuery = `
    query ($first: Int, $handle: String) {
        blog(handle: $handle) {
            articles (first: $first) {
                edges {
                    node {
                        handle
                        publishedAt
                    }
                }
            }
        }
    }
`

export const articleQuery = `
    query ($blogHandle:String!, $handle:String!) {
        blog(handle:$blogHandle) {
            articleByHandle(handle:$handle) {
                id
                handle
                title
                content
                contentHtml
                publishedAt
                image {
                    url
                    height
                    width
                    altText
                }
            }
        }
    }
`