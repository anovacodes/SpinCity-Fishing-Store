import Container from "@/components/Container"
import RecoverForm from "@/components/forms/RecoverForm"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Enter your email"
}

const RecoverPage = () => {
    return (
        <Container>
            <div className="w-[80%] sm:w-[70%] lg:w-[40%] pt-32 mx-auto">
                <h1 className="text-center text-2xl text-neutral-700 mb-5">Enter your email</h1>

                <p className="text-center text-lg text-neutral-500 mb-10">
                    We will send you a link to restore access. Follow it.
                </p>

                <div className="h-full flex flex-col items-center justify-center">
                    <RecoverForm />
                </div>
            </div>
        </Container>
    )
}

export default RecoverPage
