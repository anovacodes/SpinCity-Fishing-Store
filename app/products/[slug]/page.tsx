import { getProduct } from "@/actions/shopify/getProduct"
import { getShopInfo } from "@/actions/shopify/getShopInfo"
import ProductWrapper from "@/components/product/ProductWrapper"
import { ProductSkeleton } from "@/components/UI/skeletons"
import { envVariables } from "@/config/env.config"
import { baseUrl } from "@/config/settings.config"
import { shortenText } from "@/utils/utils"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Suspense } from "react"

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

    const product = await getProduct(slug)
    const shopInfo = await getShopInfo()

    if (!product) {
        notFound()
    }

    const { title, description, handle, featuredImage } = product
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
            url: `/products/${handle}`,
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

const ProductPage = ({ params }: Props) => {
    const { slug } = params

    return (
        <Suspense fallback={<ProductSkeleton />}>
            <ProductWrapper slug={slug} />
        </Suspense>
    )
}

export default ProductPage
