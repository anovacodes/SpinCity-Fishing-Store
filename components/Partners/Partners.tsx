import "./style.css"
import xss from "xss"
import { getArticle } from "@/actions/shopify/getArticle"
import Section from "../Section"

const Partners = async () => {
    const article = await getArticle("partners", "logos")

    const contentHtml = article?.contentHtml

    if (!contentHtml) return null

    return (
        <Section title="Our partners">
            <div
                className="partners-logos grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 items-center gap-10 grayscale-[25%]"
                dangerouslySetInnerHTML={{ __html: xss(contentHtml) }}
            ></div>
        </Section>
    )
}

export default Partners
