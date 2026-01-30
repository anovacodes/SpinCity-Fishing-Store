import { imageFragment } from "../fragments/image"

export const logoQuery = `
    query {
        shop {
            brand {
                logo {
                    image {
                        ... imageItem
                    }
                }
            }
        }
    }
    ${imageFragment}
`

export const shopInfoQuery = `
    query {
        shop {
            name
            description
        }
    }
`