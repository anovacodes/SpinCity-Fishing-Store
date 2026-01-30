"use client"

import { CurrentUser } from "@/actions/auth/getCurrentUser"
import { addReview } from "@/actions/prisma/addReview"
import { Product } from "@/lib/shopify/types"
import { reviewSchema } from "@/lib/zod/schema"
import type { ReviewSchema } from "@/lib/zod/types"
import { zodResolver } from "@hookform/resolvers/zod"
import type { FC } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import StarRating from "../UI/StarRating"
import { useRouter } from "next/navigation"
import ErrorNotification from "../UI/ErrorNotification"
import { useError } from "@/hooks/useError"
import { STORE_SETTINGS } from "@/config/settings.config"
import Button from "../UI/Button"

interface ReviewsFormProps {
    currentUser?: CurrentUser
    product: Product
}

const ReviewsForm: FC<ReviewsFormProps> = ({ currentUser, product }) => {
    const router = useRouter()
    const { error, setError } = useError()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<ReviewSchema>({
        resolver: zodResolver(reviewSchema)
    })

    const onSubmit: SubmitHandler<ReviewSchema> = async (data) => {
        if (isSubmitting) return

        try {
            if (!currentUser) {
                throw new Error("Please log in to leave a review")
            }

            if (STORE_SETTINGS.commentsFormStatus === "disabled") {
                throw new Error("Reviews section is temporarily disabled")
            }

            await addReview(data)

            router.refresh()
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message)

                setError(error.message)
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <h2 className="text-xl font-semibold text-neutral-600 mb-8">Reviews</h2>

            {error && <ErrorNotification message={error} />}

            <div
                className={`
                    flex 
                    flex-col 
                    gap-6 
                    mb-8
                    ${error ? "mt-5" : "mt-0"}
                `}
            >
                <StarRating register={register} starSize={28} id="star-rating-form" />

                <input
                    className="
                            bg-neutral-100
                            focus:bg-neutral-200
                            text-neutral-700
                            placeholder:text-neutral-400
                            focus:placeholder:text-neutral-500
                            rounded-lg
                            leading-none
                            outline-none
                            py-4
                            px-3
                            transition-colors
                        "
                    type="text"
                    placeholder="Your name"
                    autoComplete="off"
                    defaultValue={currentUser?.firstName}
                    {...register("name")}
                />

                {errors["name"]?.message && <p className="text-rose-600">{errors["name"].message as string}</p>}

                <textarea
                    className="
                        block
                        h-52
                        resize-none
                        bg-neutral-100
                        focus:bg-neutral-200
                        text-neutral-700
                        placeholder:text-neutral-400
                        focus:placeholder:text-neutral-500
                        rounded-lg
                        leading-none
                        outline-none
                        py-5
                        px-3
                        transition-colors
                    "
                    placeholder="Your message"
                    {...register("message")}
                ></textarea>

                {errors["message"]?.message && <p className="text-rose-600">{errors["message"].message as string}</p>}

                <input type="hidden" {...register("productHandle")} defaultValue={product.handle} />

                <Button
                    disabled={isSubmitting}
                    className={`
                        w-full    
                        md:w-fit
                        font-medium
                        leading-none
                        py-4
                        px-12
                        bg-neutral-600
                        hover:bg-neutral-400
                        focus:bg-neutral-400
                        disabled:bg-neutral-300
                    `}
                >
                    Send
                </Button>
            </div>
        </form>
    )
}

export default ReviewsForm
