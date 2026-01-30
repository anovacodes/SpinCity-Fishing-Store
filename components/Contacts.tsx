import xss from "xss"
import Container from "./Container"
import CustomGoogleMap from "./CustomGoogleMap"
import { getLocations } from "@/actions/shopify/getLocations"
import type { FC } from "react"

interface ContactsProps {
    title: string | null
    body: string | null
}

const Contacts: FC<ContactsProps> = async ({ title, body }) => {
    const [location] = await getLocations()

    return (
        <div>
            <Container>
                <h1 className="text-3xl text-neutral-700 font-bold mt-6 mb-10 md:my-12 text-center">{title}</h1>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10">
                    <div className="cms-editor" dangerouslySetInnerHTML={{ __html: xss(body ?? "") }} />

                    <CustomGoogleMap location={location} />
                </div>
            </Container>
        </div>
    )
}

export default Contacts
