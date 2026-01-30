import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa"
import SocialItem, { SocialLink } from "./SocialItem"

const SOCIAL_LINKS: Array<SocialLink> = [
    {
        title: "Instagram",
        url: "https://www.instagram.com/",
        icon: FaInstagram
    },
    {
        title: "Facebook",
        url: "https://facebook.com/",
        icon: FaFacebookF
    },
    {
        title: "Twitter",
        url: "https://twitter.com/",
        icon: FaTwitter
    },
    {
        title: "Youtube",
        url: "https://youtube.com/",
        icon: FaYoutube
    }
]

const Social = () => {
    return (
        <ul className="flex items-center flex-wrap gap-2">
            {SOCIAL_LINKS.map((item) => (
                <SocialItem
                    key={item.url}
                    title={item.title}
                    url={item.url}
                    icon={item.icon}
                />
            ))}
        </ul>
    )
}

export default Social
