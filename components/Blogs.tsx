"use client"

import type { ArticleEdge, Variables } from "@/lib/shopify/types"
import BlogsListItem from "./BlogsListItem"
import LoadMoreButton from "./UI/LoadMoreButton"
import { FC, useEffect, useState } from "react"
import { getArticles } from "@/actions/shopify/getArticles"
import { articlesQuery } from "@/lib/shopify/queries/articles"
import { isDev } from "@/config/settings.config"

interface BlogsProps {
    articles: ArticleEdge[]
    itemsPerPage: number
    variables: Variables
}

const Blogs: FC<BlogsProps> = ({ articles = [], itemsPerPage, variables = {} }) => {
    const [articlesEdges, setArticlesEdges] = useState<ArticleEdge[]>(articles)
    const [cursor, setCursor] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setArticlesEdges(articles)
    }, [articles])

    const handleClick = async () => {
        if (isLoading) return null

        try {
            if (cursor) {
                setIsLoading(true)

                const edges = await getArticles(articlesQuery, {
                    ...variables,
                    after: cursor
                })

                setArticlesEdges([...articlesEdges, ...edges])
            }
        } catch (error) {
            if (isDev) {
                console.error("LOAD BLOGS FROM CLIENT ERROR: ", error)
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <ul className="grid grid-cols-3 gap-8">
                {articlesEdges.map((item, index) => {
                    const isLastItem = index + 1 === articlesEdges.length

                    if (isLastItem && cursor !== item.cursor) {
                        setCursor(item.cursor)
                    }

                    return (
                        <li key={item.node.id}>
                            <BlogsListItem articleEdge={item} />
                        </li>
                    )
                })}
            </ul>

            <LoadMoreButton items={articlesEdges} itemsPerPage={itemsPerPage} onClick={handleClick} />
        </>
    )
}

export default Blogs
