import getCurrentUser from "@/actions/auth/getCurrentUser"
import { SIGN_IN_ROUTE } from "@/auth.routes"
import UpdateUserForm from "@/components/forms/UpdateUserForm"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
    title: "Info"
}

const InfoPage = async () => {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return (
            <div className="py-56 w-[65%] mx-auto">
                <div className="text-neutral-700 text-2xl text-center mb-4">User not authorized</div>
                <div className="text-neutral-700 text-xl text-center">
                    <span className="text-neutral-400 mr-2">Login to your account to change your account info:</span>
                    <Link className="text-neutral-700 hover:underline" href={SIGN_IN_ROUTE}>
                        login
                    </Link>
                </div>
            </div>
        )
    }

    return <UpdateUserForm currentUser={currentUser} />
}

export default InfoPage
