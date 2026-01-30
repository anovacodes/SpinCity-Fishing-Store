import type { ArticleEdge } from "@/lib/shopify/types"
import BlogsListItem from "./BlogsListItem"
import type { FC } from "react"

interface BlogsPreviewListProps {
    articles: ArticleEdge[]
}

const BlogsPreviewList: FC<BlogsPreviewListProps> = async ({ articles }) => {
    return (
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {articles.map((article) => {
                return (
                    <li key={article.node.id}>
                        <BlogsListItem articleEdge={article} />
                    </li>
                )
            })}
        </ul>
    )
}

export default BlogsPreviewList
