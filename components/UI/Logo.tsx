import { getLogo } from "@/actions/shopify/getLogo"
import Image from "next/image"
import Link from "next/link"

const Logo = async () => {
    const logo = await getLogo()

    if (!logo) return null

    const { width, height, altText, url } = logo

    return (
        <Link href="/" className="inline-block">
            <Image
                className="max-w-[183px]"
                width={width}
                height={height}
                src={url}
                alt={altText ?? ""}
                priority={true}
            />
        </Link>
    )
}

export default Logo
