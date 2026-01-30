import { getCatalog } from "@/actions/shopify/getCatalog"
import Catalog from "./Catalog/Catalog"
import { CurrentUser } from "@/actions/auth/getCurrentUser"
import { FC } from "react"

interface HeaderBottomProps {
    currentUser?: CurrentUser
}

const HeaderBottom: FC<HeaderBottomProps> = async ({ currentUser }) => {
    const catalog = await getCatalog()

    return <Catalog items={catalog} currentUser={currentUser} />
}

export default HeaderBottom
