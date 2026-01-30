import "server-only"

import { unstable_cache } from "next/cache"
import { revalidateTag as nextRevalidateTag } from "next/cache"

type Tag = "wishlist" | "reviews"

type Options = {
    revalidate?: number | false
    tags: Array<Tag>
}

export const cache = (callback: Parameters<typeof unstable_cache>[0], options: Options) => {
    return unstable_cache(callback, undefined, options)
}

export const revalidateTag = (tag: Tag) => {
    return nextRevalidateTag(tag)
}
