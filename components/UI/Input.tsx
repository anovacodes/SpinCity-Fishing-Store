"use client"

import type { FieldErrors, UseFormRegister } from "react-hook-form"

interface InputProps {
    label: string
    type?: string
    id: string
    initialValue?: string
    name: string
    register: UseFormRegister<any>
    errors: FieldErrors
}

const Input: React.FC<InputProps> = ({
    label,
    type = "text",
    id,
    initialValue = "",
    register,
    name,
    errors
}) => {
    return (
        <div>
            <div className="relative">
                <input
                    {...register(name, { value: initialValue })}
                    type={type}
                    id={id}
                    autoComplete="off"
                    placeholder=""
                    className="
                        peer
                        block
                        w-full
                        bg-white
                        text-lg
                        text-neutral-600
                        outline-none
                        pt-5
                        px-3
                        pb-2
                        border-b-2
                        border-b-neutral-200
                        focus:border-b-rose-600
                        transition-colors
                    "
                />
                <label
                    htmlFor={id}
                    className="
                        absolute 
                        top-1/2 
                        -translate-y-[50%] 
                        left-3
                        text-neutral-600
                        pointer-events-none
                        peer-focus:-translate-y-8
                        peer-focus:scale-75
                        peer-[&:not(:placeholder-shown)]:-translate-y-8
                        peer-[&:not(:placeholder-shown)]:scale-75
                        origin-top-left
                        transition-transform   
                    "
                >
                    {label}
                </label>
            </div>

            {errors[name]?.message && (
                <p className="my-2 text-rose-600">
                    {errors[name]?.message as string}
                </p>
            )}
        </div>
    )
}

export default Input
