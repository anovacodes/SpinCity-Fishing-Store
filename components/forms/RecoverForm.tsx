"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import ErrorNotification from "../UI/ErrorNotification"
import type { RecoverUserSchema } from "@/lib/zod/types"
import { useError } from "@/hooks/useError"
import { recoverUserSchema } from "@/lib/zod/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import Input from "../UI/Input"
import Button from "../UI/Button"
import { recoverCustomer } from "@/actions/shopify/auth/recoverCustomer"

const RecoverForm = () => {
    const { error, setError } = useError()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<RecoverUserSchema>({
        resolver: zodResolver(recoverUserSchema)
    })

    const onSubmit: SubmitHandler<RecoverUserSchema> = async (data) => {
        if (isSubmitting) return

        try {
            await recoverCustomer(data)

            setError(`A message to restore access has been sent to ${data.email}`)
        } catch (error) {
            if (error instanceof Error) {
                console.error("RECOVER ERROR: ", error.message)

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
                <Input label="Email" type="email" id="1" name="email" register={register} errors={errors} />

                <Button
                    disabled={isSubmitting}
                    className={`
                        text-xl
                        mt-8
                    `}
                >
                    Send
                </Button>
            </form>
        </div>
    )
}

export default RecoverForm
