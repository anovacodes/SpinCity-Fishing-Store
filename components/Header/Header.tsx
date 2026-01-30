import type { CurrentUser } from "@/actions/auth/getCurrentUser"
import HeaderBottom from "./HeaderBottom"
import HeaderMiddle from "./HeaderMiddle"
import HeaderTop from "./HeaderTop"
import type { FC } from "react"

interface HeaderProps {
    currentUser?: CurrentUser
}

const Header: FC<HeaderProps> = async ({ currentUser }) => {
    return (
        <header className={`absolute inset-0 bottom-auto bg-white z-[1000] lg:z-[3000]`}>
            <HeaderTop currentUser={currentUser} />

            <HeaderMiddle currentUser={currentUser} />

            <HeaderBottom currentUser={currentUser} />
        </header>
    )
}

export default Header
