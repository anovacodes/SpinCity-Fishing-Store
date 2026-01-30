import type { FC } from "react"

interface EmptyStateProps {
    title: string
    text?: string
}

const EmptyState: FC<EmptyStateProps> = ({ title, text }) => {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <h2 className="text-2xl text-neutral-600 font-medium mt-12">
                {title}
            </h2>

            {text && <p className="text-neutral-400 mt-5">{text}</p>}
        </div>
    )
}

export default EmptyState
