import Container from "@/components/Container"
import Link from "next/link"
import SignUpForm from "@/components/forms/SignUpForm"
import { SIGN_IN_ROUTE } from "@/auth.routes"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Registration"
}

const SignUpPage = () => {
    return (
        <Container>
            <div className="w-[80%] sm:w-[70%] lg:w-[40%] pt-10 mx-auto">
                <h1 className="text-center text-2xl text-neutral-700 mb-8">Create new account</h1>

                <div className="flex flex-col items-center justify-center">
                    <SignUpForm />

                    <div className="ml-auto mt-7">
                        <span className="mr-2">Already have an account?</span>
                        <Link
                            className="text-neutral-500 hover:text-neutral-400 transition-colors"
                            href={SIGN_IN_ROUTE}
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default SignUpPage
