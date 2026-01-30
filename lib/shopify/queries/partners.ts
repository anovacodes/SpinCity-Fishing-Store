export const partnersQuery = `
    query {
        blog(handle:"partners") {
            articleByHandle(handle:"logos") {
                title
                contentHtml
            }
        }
    }
`