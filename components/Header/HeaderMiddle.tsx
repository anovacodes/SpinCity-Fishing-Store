import { getLocations } from "@/actions/shopify/getLocations"
import Container from "../Container"
import ContactSpoiler from "../UI/ContactSpoiler"
import LocationInfo from "../UI/LocationInfo"
import Logo from "../UI/Logo"
import ProductSearch from "../ProductSearch"
import ShopActions from "../UI/ShopActions/ShopActions"
import { CurrentUser } from "@/actions/auth/getCurrentUser"
import { FC } from "react"

interface HeaderMiddleProps {
    currentUser?: CurrentUser
}

const HeaderMiddle: FC<HeaderMiddleProps> = async ({ currentUser }) => {
    const [location] = await getLocations()

    return (
        <div>
            <Container>
                <div className="flex items-center justify-between gap-8 md:gap-[10px] shadow-sm sm:shadow-none sm:border-b border-neutral-200 py-6 md:py-4">
                    <div className="hidden sm:block">
                        <Logo />
                    </div>

                    <ProductSearch />

                    <div className="hidden lg:block">
                        <LocationInfo location={location} />
                    </div>

                    <div className="hidden lg:block">
                        <ContactSpoiler />
                    </div>

                    <div className="hidden md:block">
                        <ShopActions currentUser={currentUser} />
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default HeaderMiddle
