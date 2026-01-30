"use client"

import { CurrentUser } from "@/actions/auth/getCurrentUser"
import CatalogTopItem from "./CatalogTopItem"
import Container from "@/components/Container"
import { useCatalog } from "@/hooks/useCatalog"
import type { CatalogItem } from "@/lib/shopify/types"
import { signOut } from "next-auth/react"
import { FC } from "react"
import { SIGN_OUT_CALLBACK_URL } from "@/auth.routes"
import Button from "@/components/UI/Button"

interface CatalogProps {
    items: CatalogItem[]
    currentUser?: CurrentUser
}

const Catalog: FC<CatalogProps> = ({ items = [], currentUser }) => {
    const { isActive } = useCatalog((state) => ({
        isActive: state.isActive
    }))

    return (
        <div
            className={`
            ${isActive ? "block" : "hidden"}
            md:block
        `}
        >
            <Container>
                <ul className="relative shadow-md flex flex-col flex-wrap md:flex-row">
                    {items.map((item) => (
                        <CatalogTopItem key={item.id} item={item} />
                    ))}

                    {currentUser && (
                        <Button
                            className={`
                                md:hidden
                                text-left
                                p-5
                                rounded-md
                            `}
                            onClick={() => {
                                signOut({
                                    callbackUrl: SIGN_OUT_CALLBACK_URL
                                })
                            }}
                        >
                            Sign Out
                        </Button>
                    )}
                </ul>
            </Container>
        </div>
    )
}

export default Catalog
