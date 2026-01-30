import { STORE_SETTINGS } from "@/config/settings.config"
import { useEffect, useState } from "react"

export const useError = () => {
    const [error, setError] = useState<string>("")

    useEffect(() => {
        if (!error) return

        const timer = setTimeout(() => {
            setError("")
        }, STORE_SETTINGS.notificationVisibilityTime)

        return () => {
            clearTimeout(timer)
        }
    }, [error])

    return { error, setError }
}