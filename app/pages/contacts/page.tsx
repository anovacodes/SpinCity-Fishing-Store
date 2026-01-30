import { getPage } from "@/actions/shopify/getPage"
import Contacts from "@/components/Contacts"
import { notFound } from "next/navigation"

const ContactsPage = async () => {
    const page = await getPage("contacts")

    if (!page) {
        notFound()
    }

    const { title = "", body = "" } = page

    return <Contacts title={title} body={body} />
}

export default ContactsPage
