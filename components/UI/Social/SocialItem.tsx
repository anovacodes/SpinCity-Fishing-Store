import Link from "next/link"
import type { IconType } from "react-icons"

export type SocialLink = {
    title: string
    url: string
    icon: IconType
}

const SocialItem: React.FC<SocialLink> = ({ url, icon: Icon }) => {
    return (
        <li className="group flex items-center">
            <Link href={url} className="inline-block p-[4.5px]">
                <Icon size={20} className="text-neutral-700 group-hover:text-rose-600 transition-colors" />
            </Link>
        </li>
    )
}

export default SocialItem
