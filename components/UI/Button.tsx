"use client"

import { cn } from "@/utils/utils"
import { forwardRef, type ButtonHTMLAttributes } from "react"

type ButtonBaseAttributes = ButtonHTMLAttributes<HTMLButtonElement>

interface ButtonProps extends ButtonBaseAttributes {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ children, className, ...rest }, ref) => {
    return (
        <button
            className={cn(
                `
                    block
                    text-lg 
                    text-white 
                    bg-rose-600 
                    hover:bg-rose-400 
                    focus:bg-rose-400 
                    disabled:bg-rose-400
                    rounded-lg
                    py-3
                    px-8
                    outline-none
                    select-none
                    cursor-pointer
                    disabled:cursor-not-allowed
                    transition-colors
                `,
                className
            )}
            ref={ref}
            {...rest}
        >
            {children}
        </button>
    )
})

Button.displayName = "Button"

export default Button
