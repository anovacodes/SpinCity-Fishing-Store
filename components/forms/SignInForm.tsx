"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import Input from "../UI/Input"
import type { SignInSchema } from "@/lib/zod/types"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signInSchema } from "@/lib/zod/schema"
import ErrorNotification from "../UI/ErrorNotification"
import { DEFAULT_LOGIN_REDIRECT } from "@/auth.routes"
import { useError } from "@/hooks/useError"
import Button from "../UI/Button"
import { useEffect } from "react"

const SignInForm = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { error, setError } = useError()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema)
    })

    const onSubmit: SubmitHandler<SignInSchema> = async (data) => {
        if (isSubmitting) return

        try {
            const response = await signIn("credentials", {
                ...data,
                redirect: false
            })

            if (response?.ok && response.error) {
                throw new Error(response.error)
            }

            router.push(DEFAULT_LOGIN_REDIRECT)
        } catch (error) {
            if (error instanceof Error) {
                console.error("SIGN IN ERROR: ", error.message)

                setError("Invalid credentials.")
            }
        } finally {
            router.refresh()
        }
    }

    useEffect(() => {
        const action = searchParams.get("action")

        if (action === "recover") {
            setError("The password has been successfully changed. Please log in again using your new password.")
        }
    }, [searchParams, setError])

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
                <Input label="Password" type="password" id="2" name="password" register={register} errors={errors} />

                <Button
                    disabled={isSubmitting}
                    className={`
                        text-xl
                        mt-8
                    `}
                >
                    Sign In
                </Button>
            </form>
        </div>
    )
}

export default SignInForm
