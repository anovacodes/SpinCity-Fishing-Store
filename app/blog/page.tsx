import { getArticles } from "@/actions/shopify/getArticles"
import Blogs from "@/components/Blogs"
import Container from "@/components/Container"
import Breadcrumbs from "@/components/UI/Breadcrumbs"
import { STORE_SETTINGS } from "@/config/settings.config"
import { articlesQuery } from "@/lib/shopify/queries/articles"
import { blogsListVariables } from "@/lib/shopify/variables"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Blog"
}

const BlogPage = async () => {
    const articles = await getArticles(articlesQuery, blogsListVariables())

    return (
        <div>
            <Container>
                <Breadcrumbs items={[{ label: "Blog", href: "/blog" }]} />

                <Blogs
                    articles={articles}
                    itemsPerPage={STORE_SETTINGS.blogListCount}
                    variables={blogsListVariables()}
                />
            </Container>
        </div>
    )
}

export default BlogPage
