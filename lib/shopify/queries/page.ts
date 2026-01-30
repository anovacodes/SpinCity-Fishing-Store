export const pageQuery = `
    query ($handle:String) {
        page(handle:$handle) {
            handle
            title
            body
            bodySummary
        }
    }
`