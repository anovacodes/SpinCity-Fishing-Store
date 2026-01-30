import { getArticle } from "@/actions/shopify/getArticle"
import { getShopInfo } from "@/actions/shopify/getShopInfo"
import Container from "@/components/Container"
import Breadcrumbs from "@/components/UI/Breadcrumbs"
import { envVariables } from "@/config/env.config"
import { baseUrl } from "@/config/settings.config"
import { shortenText } from "@/utils/utils"
import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import xss from "xss"

type Props = {
    params: {
        slug: string
    }
    searchParams: {
        [key: string]: string | string[] | undefined
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = params

    const article = await getArticle("articles", slug)
    const shopInfo = await getShopInfo()

    if (!article) {
        notFound()
    }

    const { title, handle, content: description, image: featuredImage } = article
    const websiteName = shopInfo?.name ?? envVariables.DEFAULT_WEBSITE_NAME

    const shortTitle = shortenText(title, 55)
    const shortDescription = shortenText(description, 190)

    const openGraphImageUrl = featuredImage?.url ?? `${baseUrl}/opengraph-image.jpg`
    const openGraphImageAlt = featuredImage?.altText ?? title
    const openGraphImageSize = {
        width: featuredImage?.width ?? 1200,
        height: featuredImage?.height ?? 630
    }

    return {
        title,
        description: shortDescription,
        openGraph: {
            title: shortTitle,
            description: shortDescription,
            url: `/blog/${handle}`,
            siteName: websiteName,
            type: "article",
            images: [
                {
                    url: openGraphImageUrl,
                    width: openGraphImageSize.width,
                    height: openGraphImageSize.height,
                    alt: openGraphImageAlt
                }
            ]
        }
    }
}

const ArticlePage = async ({ params }: Props) => {
    const { slug } = params

    const article = await getArticle("articles", slug)

    if (!article || !article.image) {
        notFound()
    }

    const { title, contentHtml, image } = article

    return (
        <div>
            <Container>
                <Breadcrumbs
                    items={[
                        { label: "Blog", href: "/blog" },
                        { label: title, href: `/blog/${slug}` }
                    ]}
                />

                <Image
                    className="min-w-full min-h-[450px] object-cover"
                    width={image.width}
                    height={image.height}
                    src={image.url}
                    alt={image.altText ?? title}
                />

                <h1 className="text-3xl text-neutral-700 font-bold my-8 md:my-12 text-center">{title}</h1>
                <div className="cms-editor" dangerouslySetInnerHTML={{ __html: xss(contentHtml ?? "") }} />
            </Container>
        </div>
    )
}

export default ArticlePage
