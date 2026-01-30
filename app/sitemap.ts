import { getArticles } from "@/actions/shopify/getArticles"
import { getProducts } from "@/actions/shopify/getProducts"
import { baseUrl } from "@/config/settings.config"
import { articlesHandlesQuery } from "@/lib/shopify/queries/articles"
import { productsHandlesQuery } from "@/lib/shopify/queries/products"
import type { SitemapArticleEdge, SitemapProductsEdge } from "@/lib/shopify/types"
import { sitemapArticlesVariables, sitemapProductsVariables } from "@/lib/shopify/variables"
import { MetadataRoute } from "next"
import { notFound } from "next/navigation"

type Sitemap = MetadataRoute.Sitemap[0]

const STATIC_ROUTES = [
    {
        label: "Main page",
        url: baseUrl,
        priority: 1
    },
    {
        label: "Blog page",
        url: `${baseUrl}/blog`
    },
    {
        label: "About page",
        url: `${baseUrl}/pages/about`
    },
    {
        label: "Contacts page",
        url: `${baseUrl}/pages/contacts`
    },
    {
        label: "Delivery page",
        url: `${baseUrl}/pages/delivery`
    },
    {
        label: "Return page",
        url: `${baseUrl}/pages/return`
    },
    {
        label: "Privacy policy page",
        url: `${baseUrl}/pages/privacy-policy`
    },
    {
        label: "Terms of service page",
        url: `${baseUrl}/pages/terms-of-service`
    },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    try {
        const productEdges = await getProducts(productsHandlesQuery, sitemapProductsVariables()) as unknown as SitemapProductsEdge[]
        const articlesEdges = await getArticles(articlesHandlesQuery, sitemapArticlesVariables()) as unknown as SitemapArticleEdge[]

        const productPagesSitemapData = productEdges.map((edge): Sitemap => {
            const { handle, updatedAt } = edge.node

            return {
                url: `${baseUrl}/products/${handle}`,
                lastModified: updatedAt,
                priority: 0.9
            }
        })

        const articlePagesSitemapData = articlesEdges.map((edge): Sitemap => {
            const { handle, publishedAt } = edge.node

            return {
                url: `${baseUrl}/blog/${handle}`,
                lastModified: publishedAt,
                priority: 0.8
            }
        })

        const staticSitemapRoutes = STATIC_ROUTES.map((route): Sitemap => ({
            url: route.url,
            lastModified: new Date(),
            priority: route.priority ?? 0.7
        }))

        return [
            ...staticSitemapRoutes,
            ...productPagesSitemapData,
            ...articlePagesSitemapData
        ]
    } catch (error) {
        notFound()
    }
}