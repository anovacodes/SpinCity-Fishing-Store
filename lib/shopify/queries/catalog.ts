export const catalogQuery = `
    query {
        menu(handle:"catalog") {
            items {
                id
                title
                url

                items {
                    id
                    title
                    url

                    items {
                        id
                        title
                        url
                    }
                }
            }
        }
    }
`