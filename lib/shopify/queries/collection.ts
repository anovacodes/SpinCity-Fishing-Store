export const collectionInfoByHandleQuery = `
query ($handle: String) {
    collection(handle:$handle) {
        id
        handle
        title
        description
    }
}
`