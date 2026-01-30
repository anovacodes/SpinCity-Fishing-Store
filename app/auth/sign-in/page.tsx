import Container from "@/components/Container"
import Link from "next/link"
import SignInForm from "@/components/forms/SignInForm"
import { RESET_ROUTE, SIGN_UP_ROUTE } from "@/auth.routes"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Login"
}

const SignInPage = () => {
    return (
        <Container>
            <div className="w-[80%] sm:w-[70%] lg:w-[40%] pt-32 mx-auto">
                <h1 className="text-center text-2xl text-neutral-700 mb-8">Sign In</h1>

                <div className="h-full flex flex-col items-center justify-center">
                    <SignInForm />

                    <div className="ml-auto mt-7">
                        <span className="mr-2">Don&apos;t have an account?</span>
                        <Link
                            className="text-neutral-500 hover:text-neutral-400 transition-colors"
                            href={SIGN_UP_ROUTE}
                        >
                            Register
                        </Link>
                    </div>

                    <div className="ml-auto mt-3">
                        <span className="mr-2">Forgotten password?</span>
                        <Link className="text-neutral-500 hover:text-neutral-400 transition-colors" href={RESET_ROUTE}>
                            Reset
                        </Link>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default SignInPage
