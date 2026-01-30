"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import Input from "../UI/Input"
import type { UpdateUserSchema } from "@/lib/zod/types"
import type { FC } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateUserSchema } from "@/lib/zod/schema"
import { useRouter } from "next/navigation"
import type { CurrentUser } from "@/actions/auth/getCurrentUser"
import ErrorNotification from "../UI/ErrorNotification"
import toast from "react-hot-toast"
import { useError } from "@/hooks/useError"
import Button from "../UI/Button"
import { updateCustomer } from "@/actions/shopify/auth/updateCustomer"

interface UpdateUserFormProps {
    currentUser: CurrentUser
}

const UpdateUserForm: FC<UpdateUserFormProps> = ({ currentUser }) => {
    const router = useRouter()
    const { error, setError } = useError()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<UpdateUserSchema>({
        resolver: zodResolver(updateUserSchema)
    })

    const onSubmit: SubmitHandler<UpdateUserSchema> = async (data) => {
        try {
            const payload = await updateCustomer(data)

            if (payload && !payload.customerUserErrors.length) {
                toast.success("Customer has been updated.", {
                    id: "form"
                })
            }

            router.refresh()
        } catch (error) {
            if (error instanceof Error) {
                console.error("UPDATE USER DATA ERROR: ", error.message)

                setError(error.message)
            }
        }
    }

    return (
        <div className="pt-5 xl:pt-0">
            {error && <ErrorNotification message={error} />}

            <form
                className={`
                    grid 
                    grid-cols-1 
                    gap-20 
                    ${error ? "mt-5" : "mt-0"}   
                `}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Input
                    label="First name"
                    id="profile_input_1"
                    name="firstName"
                    register={register}
                    errors={errors}
                    initialValue={currentUser?.firstName}
                />
                <Input
                    label="Last name"
                    id="profile_input_2"
                    name="lastName"
                    register={register}
                    errors={errors}
                    initialValue={currentUser?.lastName}
                />
                <Input
                    label="Email"
                    id="profile_input_3"
                    type="email"
                    name="email"
                    register={register}
                    errors={errors}
                    initialValue={currentUser?.email}
                />
                <Input
                    label="New password"
                    id="profile_input_4"
                    type="password"
                    name="password"
                    register={register}
                    errors={errors}
                />
                <Input
                    label="Confirm password"
                    id="profile_input_5"
                    type="password"
                    name="confirmPassword"
                    register={register}
                    errors={errors}
                />
                <Input
                    label="Phone"
                    id="profile_input_6"
                    name="phone"
                    register={register}
                    errors={errors}
                    initialValue={currentUser?.phone ?? ""}
                />

                <Button
                    disabled={isSubmitting}
                    className={`
                        text-xl
                    `}
                >
                    Save
                </Button>
            </form>
        </div>
    )
}

export default UpdateUserForm
