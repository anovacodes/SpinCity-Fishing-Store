import getCurrentUser from "@/actions/auth/getCurrentUser"
import Container from "@/components/Container"
import ProfileTabs from "@/components/ProfileTabs"

const ProfileLayout = async ({ children }: { children: React.ReactNode }) => {
    const currentUser = await getCurrentUser()

    return (
        <div>
            <Container>
                <div className="mt-[30px] grid grid-cols-1 xl:grid-cols-[16%_82%] justify-between xl:gap-2">
                    <ProfileTabs currentUser={currentUser} />

                    {children}
                </div>
            </Container>
        </div>
    )
}

export default ProfileLayout
