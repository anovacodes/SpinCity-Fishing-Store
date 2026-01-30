"use client"

import { FC, useState } from "react"
import Comment from "./Comment"
import type { Review } from "@prisma/client"

interface ReviewsProps {
    reviews?: Review[]
}

const Reviews: FC<ReviewsProps> = ({ reviews = [] }) => {
    const [showAllReviews, setShowAllReviews] = useState(() => reviews.length <= 3)

    if (!reviews || reviews.length === 0) {
        return (
            <div>
                <div
                    className={`
                        text-xl 
                        font-semibold 
                        text-neutral-600
                    `}
                >
                    No comments here
                </div>
            </div>
        )
    }

    return (
        <div>
            <div
                className={`
                    text-xl 
                    font-semibold 
                    text-neutral-600
                    mb-6
                `}
            >
                {`${reviews.length} comments`}
            </div>

            <ul
                className={`
                    relative
                    overflow-hidden
                    flex 
                    flex-col 
                    gap-5
                    after:absolute
                    after:inset-0
                    after:top-auto
                    after:w-full
                    after:h-32
                    after:bg-gradient-to-t
                    after:from-white
                    after:to-[rgba(0, 0, 0, 0)]
                    after:transition-opacity
                    ${showAllReviews ? "after:-z-10 max-h-none after:opacity-0" : "after:z-10 max-h-[230px] after:opacity-1"}
                `}
            >
                {reviews.map((review) => (
                    <li key={review.id}>
                        <Comment {...review} />
                    </li>
                ))}

                <button
                    className={`
                        absolute left-0 -bottom-0 z-20
                      text-rose-500
                        font-medium
                      hover:text-rose-300
                        transition-colors
                        ${!showAllReviews ? "block" : "hidden"}
                    `}
                    onClick={() => setShowAllReviews(true)}
                >
                    Show all reviews
                </button>
            </ul>
        </div>
    )
}

export default Reviews
