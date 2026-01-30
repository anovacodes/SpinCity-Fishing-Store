import type { Location } from "@/lib/shopify/types"
import Link from "next/link"
import type { FC } from "react"
import { IoLocationOutline } from "react-icons/io5"

interface LocationInfoProps {
    location?: Location
}

const LocationInfo: FC<LocationInfoProps> = ({ location }) => {
    return (
        <>
            {location && (
                <Link
                    href="/pages/contacts"
                    className="flex items-center gap-2 text-neutral-400 hover:text-neutral-500 transition-colors"
                >
                    <IoLocationOutline size={28} />
                    <span>
                        {location.address?.country}, {location.address?.city}
                    </span>
                </Link>
            )}
        </>
    )
}

export default LocationInfo
