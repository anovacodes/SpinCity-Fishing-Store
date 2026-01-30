import { getPage } from "@/actions/shopify/getPage"
import Container from "@/components/Container"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import type { FC } from "react"
import xss from "xss"

interface PageProps {
    params: {
        slug: string
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = params

    const page = await getPage(slug)

    if (!page) {
        notFound()
    }

    const { title = "Untitled", bodySummary = "" } = page

    return {
        title,
        description: bodySummary
    }
}

const Page: FC<PageProps> = async ({ params }) => {
    const { slug } = params

    const page = await getPage(slug)

    if (!page) {
        notFound()
    }

    const { title = "", body = "" } = page

    return (
        <div>
            <Container>
                <h1 className="text-3xl text-neutral-700 font-bold mt-6 mb-10 md:my-12 text-center">{title}</h1>
                <div className="cms-editor" dangerouslySetInnerHTML={{ __html: xss(body ?? "") }} />
            </Container>
        </div>
    )
}

export default Page
