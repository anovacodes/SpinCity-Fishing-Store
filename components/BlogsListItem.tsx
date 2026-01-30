import { roboto } from "@/utils/fonts"
import { format } from "date-fns"
import Link from "next/link"
import Image from "next/image"
import placeholder from "@/public/placeholder.jpg"
import type { ArticleEdge } from "@/lib/shopify/types"

const BlogsListItem = ({ articleEdge }: { articleEdge: ArticleEdge }) => {
    const { node: article } = articleEdge

    return (
        <article className="group" key={article.id}>
            <Link className="block relative h-[275px] bg-white" href={`/blog/${article.handle}`}>
                <Image
                    className="object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-1000"
                    fill
                    sizes="100%"
                    src={article.image?.url ?? placeholder}
                    alt={article.content ?? article.title}
                    priority={true}
                />
            </Link>

            <div className="p-7">
                <div>
                    <Link className="" href={`/blog/${article.handle}`}>
                        <h4 className="text-xl font-bold text-neutral-700 hover:text-neutral-500 transition-colors text-ellipsis overflow-hidden whitespace-nowrap mb-3">
                            {article.title}
                        </h4>
                    </Link>
                    <p className={`${roboto.className} text-neutral-400 mb-4 line-clamp-4`}>{article.content}</p>
                </div>

                <div className="text-sm text-right text-neutral-500 font-medium">
                    {format(new Date(article.publishedAt), "dd.MM.yyyy")}
                </div>
            </div>
        </article>
    )
}

export default BlogsListItem
