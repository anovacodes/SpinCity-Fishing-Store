export const checkIfSessionExpired = (expirationTimestamp: number) => {
    const currentTime = Date.now()

    if (String(expirationTimestamp).length === 10) {
        expirationTimestamp *= 1000
    }
    
    if (expirationTimestamp - currentTime <= -3000) {
        return true
    }

    return false
}