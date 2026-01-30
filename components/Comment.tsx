import type { FC } from "react"
import StarRating from "./UI/StarRating"
import { format } from "date-fns"

interface CommentProps {
    id: string
    name: string
    message: string
    rating: number
    createdAt: Date
}

const Comment: FC<CommentProps> = ({ id, name, message, rating, createdAt }) => {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
                <span className="text-neutral-700 font-semibold">{name}</span>

                {rating > 0 && <StarRating starSize={14} id={id} rating={rating} />}

                <span className="text-neutral-400 text-sm">{format(new Date(createdAt), "dd.MM.yyyy")}</span>
            </div>
            <p className="text-neutral-600 text-sm">{message}</p>
        </div>
    )
}

export default Comment
