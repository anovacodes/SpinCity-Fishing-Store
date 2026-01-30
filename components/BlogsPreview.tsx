import { getArticles } from "@/actions/shopify/getArticles"
import { articlesQuery } from "@/lib/shopify/queries/articles"
import { blogsPreviewListVariables } from "@/lib/shopify/variables"
import BlogsPreviewList from "./BlogsPreviewList"
import Section from "./Section"

const BlogsPreview = async () => {
    const articles = await getArticles(articlesQuery, blogsPreviewListVariables())

    return (
        <Section title="Blogs" className="pb-0">
            <BlogsPreviewList articles={articles} />
        </Section>
    )
}

export default BlogsPreview
