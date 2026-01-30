"use client"

import { SIGN_OUT_CALLBACK_URL } from "@/auth.routes"
import { signOut } from "next-auth/react"
import { FC, useEffect } from "react"

interface AuthHelperProps {
    sessionExpired?: boolean
}

const AuthHelper: FC<AuthHelperProps> = ({ sessionExpired }) => {
    useEffect(() => {
        const signOutIfSessionExpired = async () => {
            if (sessionExpired) {
                await signOut({ callbackUrl: SIGN_OUT_CALLBACK_URL })
            }
        }

        signOutIfSessionExpired()
    }, [sessionExpired])

    return <></>
}

export default AuthHelper
