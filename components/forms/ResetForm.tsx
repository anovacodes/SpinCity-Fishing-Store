"use client"

import { useError } from "@/hooks/useError"
import { zodResolver } from "@hookform/resolvers/zod"
import type { FC } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import ErrorNotification from "../UI/ErrorNotification"
import Input from "../UI/Input"
import Button from "../UI/Button"
import type { ResetUserSchema } from "@/lib/zod/types"
import { resetUserSchema } from "@/lib/zod/schema"
import { resetCustomer } from "@/actions/shopify/auth/resetCustomer"

interface ResetFormProps {
    validUserId: string
    token: string
}

const ResetForm: FC<ResetFormProps> = ({ validUserId, token }) => {
    const { error, setError } = useError()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<ResetUserSchema>({
        resolver: zodResolver(resetUserSchema)
    })

    const onSubmit: SubmitHandler<ResetUserSchema> = async (data) => {
        if (isSubmitting) return

        try {
            await resetCustomer(validUserId, data)
        } catch (error) {
            if (error instanceof Error) {
                console.error("RESET USER ERROR: ", error.message)

                setError(error.message)
            }
        }
    }

    return (
        <div className="w-full">
            {error && <ErrorNotification message={error} />}

            <form
                onSubmit={handleSubmit(onSubmit)}
                className={`
                flex 
                flex-col 
                gap-4    
                ${error ? "mt-5" : "mt-0"}
            `}
            >
                <Input
                    label="New password"
                    type="password"
                    id="1"
                    name="password"
                    register={register}
                    errors={errors}
                />

                <Input
                    label="Confirm password"
                    type="password"
                    id="2"
                    name="confirmPassword"
                    register={register}
                    errors={errors}
                />

                <input type="hidden" {...register("resetToken")} defaultValue={token} />

                <Button
                    disabled={isSubmitting}
                    className={`
                        text-xl
                        mt-8
                    `}
                >
                    Reset
                </Button>
            </form>
        </div>
    )
}

export default ResetForm
