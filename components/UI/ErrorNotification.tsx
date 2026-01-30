import type { FC } from "react"

interface ErrorNotificationProps {
    message: string
}

const ErrorNotification: FC<ErrorNotificationProps> = ({ message }) => {
    return <p className="text-lg text-white bg-rose-600 py-2 px-6 rounded-lg">{message}</p>
}

export default ErrorNotification
