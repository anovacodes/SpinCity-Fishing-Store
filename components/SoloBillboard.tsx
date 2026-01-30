import type { Article } from "@/lib/shopify/types"
import Container from "./Container"
import Link from "next/link"
import Image from "next/image"
import type { FC } from "react"

interface SoloBillboardProps {
    billboards: Article[]
}

const SoloBillboard: FC<SoloBillboardProps> = ({ billboards }) => {
    return (
        <Container>
            {billboards.map((billboard) => {
                return (
                    <Link
                        href={billboard.title}
                        key={billboard.id}
                        className={` 
                            ${billboard.content === "desktop" ? "hidden md:block" : "block md:hidden"}
                        `}
                    >
                        <Image
                            width={billboard.image?.width}
                            height={billboard.image?.height}
                            priority={true}
                            src={billboard.image?.url ?? ""}
                            alt={billboard.image?.altText ?? "Billboard"}
                        />
                    </Link>
                )
            })}
        </Container>
    )
}

export default SoloBillboard
