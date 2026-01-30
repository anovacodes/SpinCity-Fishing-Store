"use client"

import { signUpSchema } from "@/lib/zod/schema"
import type { SignUpSchema } from "@/lib/zod/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import Input from "../UI/Input"
import ErrorNotification from "../UI/ErrorNotification"
import { DEFAULT_LOGIN_REDIRECT } from "@/auth.routes"
import { useError } from "@/hooks/useError"
import Button from "../UI/Button"
import { createUser } from "@/actions/shopify/auth/createUser"

const SignUpForm = () => {
    const router = useRouter()
    const { error, setError } = useError()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema)
    })

    const onSubmit: SubmitHandler<SignUpSchema> = async (data) => {
        if (isSubmitting) return

        try {
            const payload = await createUser(data)

            if (!payload) {
                throw new Error("Couldn't create a user.")
            }

            router.push(DEFAULT_LOGIN_REDIRECT)
        } catch (error) {
            if (error instanceof Error) {
                console.error("SIGN UP ERROR: ", error.message)

                setError(error.message)
            }
        } finally {
            router.refresh()
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
                <Input label="Email*" type="email" id="1" register={register} errors={errors} name="email" />
                <Input label="Password*" type="password" id="2" register={register} errors={errors} name="password" />
                <Input
                    label="Confirm password*"
                    type="password"
                    id="3"
                    register={register}
                    errors={errors}
                    name="confirmPassword"
                />

                <Input label="Phone*" type="text" id="6" register={register} errors={errors} name="phone" />

                <Input label="First name" type="text" id="4" register={register} errors={errors} name="firstName" />
                <Input label="Last name" type="text" id="5" register={register} errors={errors} name="lastName" />

                <div className="flex gap-2 items-center justify-end mt-3">
                    <label htmlFor="7" className="select-none text-neutral-600 text-sm">
                        Sent marketing material via email
                    </label>
                    <input
                        {...register("acceptsMarketing")}
                        className="
                            appearance-none 
                            relative 
                            w-4 
                            h-4 
                            border 
                            border-neutral-300 
                            rounded-[3px] 
                            cursor-pointer 
                            checked:before:scale-75 
                            before:w-3 
                            before:h-3 
                            before:bg-rose-600 
                            before:absolute 
                            before:-inset-[1px] 
                            before:top-1/2 
                            before:left-1/2 
                            before:-translate-x-1/2 
                            before:-translate-y-1/2 
                            before:rounded-sm 
                            before:scale-0 
                            before:transition-transform
                            before:duration-200
                        "
                        type="checkbox"
                        id="7"
                    />
                </div>

                <Button
                    disabled={isSubmitting}
                    className={`
                        text-xl
                        mt-3
                    `}
                >
                    Sign Up
                </Button>
            </form>
        </div>
    )
}

export default SignUpForm
