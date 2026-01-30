import type { SignInSchema } from "@/lib/zod/types"
import type {
    CartBuyerIdentityInput, 
    CartInputLine, 
    CartLineUpdateInput, 
    CustomerCreateInput, 
    CustomerResetInput, 
    CustomerUpdateInput
} from "./types"
import { ArticleSortKeys, OrdersSortKeys, ProductSortKeys } from "./enums"
import { SITEMAP_LIMITS, STORE_SETTINGS } from "@/config/settings.config"

export const fishingReelsSliderVariables = () => ({
    handle: "fishing-reels",
    first: STORE_SETTINGS.reelsSliderCount,
    identifiers: [
        { namespace:"custom", key:"size" },
        { namespace:"custom", key:"gear_ratio" },
        { namespace: "custom", key:"type" },
        { namespace:"custom", key:"weight" }
    ]
})

export const lineSliderVariables = () => ({
    handle: "line",
    first: STORE_SETTINGS.lineSliderCount,
    identifiers: [
        { namespace:"custom", key:"size" },
        { namespace:"custom", key:"length" },
        { namespace: "custom", key:"type" }
    ]
})

export const bestSellingVariables = () => ({
    first: STORE_SETTINGS.bestSellingCount,
    sortKey: ProductSortKeys.BEST_SELLING,
    identifiers: [
        { namespace:"custom", key:"length" },
        { namespace:"custom", key:"size" },
        { namespace:"custom", key:"gear_ratio" },
        { namespace: "custom", key:"type" },
        { namespace:"custom", key:"weight" },
        { namespace:"custom", key:"test" },
        { namespace:"custom", key:"class" },
        { namespace:"custom", key:"action" }
    ]
})

export const sitemapProductsVariables = () => ({
    first: SITEMAP_LIMITS.productHandlesCount
})

export const articleVariables = (blogHandle: string, slug: string) => ({
    blogHandle,
    handle: slug
})

export const blogsPreviewListVariables = () => ({
    first: STORE_SETTINGS.blogPreviewListCount,
    handle: "articles",
    sortKey: ArticleSortKeys.UPDATED_AT
})

export const blogsListVariables = () => ({
    first: STORE_SETTINGS.blogListCount,
    handle: "articles",
    sortKey: ArticleSortKeys.UPDATED_AT
})

export const sitemapArticlesVariables = () => ({
    first: SITEMAP_LIMITS.articlesHandlesCount,
    handle: "articles"
})

export const collectionInfoVariables = (handle: string = "") => ({
    handle
})

export const allProductsFromCollectionVariable = (slug: Array<string> = [], first: number, filters: Array<any> = []) => ({
    handle: slug[slug.length - 1],
    first,
    filters,
    identifiers: [
        { namespace:"custom", key:"size" },
        { namespace:"custom", key:"gear_ratio" },
        { namespace: "custom", key:"type" },
        { namespace:"custom", key:"weight" },
        { namespace:"custom", key:"test" },
        { namespace:"custom", key:"length" },
        { namespace:"custom", key:"class" },
        { namespace:"custom", key:"action" }
    ]
})

export const productVariables = (slug: string) => ({
    handle: slug,
    imagesLimit: 10,
    identifiers: [
        { namespace:"custom", key:"size" },
        { namespace:"custom", key:"gear_ratio" },
        { namespace: "custom", key:"type" },
        { namespace:"custom", key:"weight" },
        { namespace:"custom", key:"test" },
        { namespace:"custom", key:"length" },
        { namespace:"custom", key:"class" },
        { namespace:"custom", key:"action" }
    ]
})

export const productRecommendationsVariables = (productId: string) => ({
    productId,
    imagesLimit: 20,
    identifiers: [
        { namespace:"custom", key:"size" },
        { namespace:"custom", key:"gear_ratio" },
        { namespace: "custom", key:"type" },
        { namespace:"custom", key:"weight" },
        { namespace:"custom", key:"test" },
        { namespace:"custom", key:"length" },
        { namespace:"custom", key:"class" },
        { namespace:"custom", key:"action" }
    ]
})

export const createCartVariables = (lines: CartInputLine[] = [], buyerIdentity?: CartBuyerIdentityInput) => ({
    input: { lines, buyerIdentity }
})

export const getCartByIdVariables = (cartId: string) => ({
    id: cartId
})

export const addItemToCartVariables = (lines: CartInputLine[], cartId: string) => ({
    lines,
    cartId
})

export const removeItemsFromCartVariables = (lineIds: string[], cartId: string) => ({
    lineIds,
    cartId
})

export const changeCartItemQuantityVariables = (cartId: string, lines: CartLineUpdateInput[]) => ({
    cartId,
    lines
})

export const updateBuyerIdentityVartiables = (cartId: string, buyerIdentity: CartBuyerIdentityInput) => ({
    cartId,
    buyerIdentity
})

export const customerCreateVariables = (data: CustomerCreateInput) => ({
    input: data
})

export const customerAccessTokenCreateVariables = (data: SignInSchema) => ({
    input: data
})

export const customerUpdateVariables = (customerAccessToken: string, data: CustomerUpdateInput) => ({
    customerAccessToken,
    customer: data
})

export const customerVariables = (accessToken: string) => ({
    customerAccessToken: accessToken,
    sortKey: OrdersSortKeys.PROCESSED_AT
})

export const customerRecoverVariables = (email: string) => ({
    email
})

export const customerResetVariables = (id: string, input: CustomerResetInput) => ({
    id,
    input
})
