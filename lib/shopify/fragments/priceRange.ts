export const priceRangeFragment = `
    fragment priceRangeItem on ProductPriceRange {
        minVariantPrice {
            amount
            currencyCode
        }
        maxVariantPrice {
            amount
            currencyCode
        }
    }
`