export const locationsQuery = `
    query {
        locations(first:3) {
            nodes {
                name
                address {
                    address1
                    country
                    city
                    latitude
                    longitude
                    phone
                    zip
                }
            }
        }
    }
`