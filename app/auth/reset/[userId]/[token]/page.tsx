import Container from "@/components/Container"
import ResetForm from "@/components/forms/ResetForm"
import type { Metadata } from "next"
import type { FC } from "react"

export const metadata: Metadata = {
    title: "Set new password"
}

interface ResetPasswordPageProps {
    params: {
        userId: string
        token: string
    }
}

const ResetPasswordPage: FC<ResetPasswordPageProps> = ({ params }) => {
    const { userId, token } = params

    const validUserId = `gid://shopify/Customer/${userId}`

    return (
        <Container>
            <div className="w-[80%] sm:w-[70%] lg:w-[40%] pt-32 mx-auto">
                <h1 className="text-center text-2xl text-neutral-700 mb-8">Reset your password</h1>

                <div className="h-full flex flex-col items-center justify-center">
                    <ResetForm validUserId={validUserId} token={token} />
                </div>
            </div>
        </Container>
    )
}

export default ResetPasswordPage
