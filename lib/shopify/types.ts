import jwt from "jsonwebtoken"
import type { ResetUserSchema, SignUpSchema, UpdateUserSchema } from "@/lib/zod/types"
import type { Wishlist } from "@prisma/client"

export type Variables = Record<string, unknown>

export type PageInfo = {
    startCursor?: string
    endCursor?: string
    hasNextPage: boolean
    hasPreviousPage: boolean
}

export type CatalogItem = {
    title: string
    url: string
    id: string
    items: CatalogItem[]
}

export type CatalogQuery = {
    data: {
        menu: {
            items: CatalogItem[]
        }
    }
}

export type MenuItem = {
    title: string
    url: string
    resourceId: string
    items: MenuItem[]
}

export type MenuItemQuery = {
    data: {
        menu: {
            items: MenuItem[]
        }
    }
}

export type Page = {
    handle: string
    title?: string | null
    body?: string | null
    bodySummary?: string | null
}

export type PageQuery = {
    data: {
        page: Page
    }
}

export type ImageT = {
    url: string
    height: number
    width: number
    altText?: string | null
}

export type LogoQuery = {
    data: {
        shop: {
            brand: {
                logo: {
                    image: ImageT
                }
            }
        }
    }
}

export type ShopInfoQuery = {
    data: {
        shop: ShopInfo
    }
}

export type ShopInfo = {
    name: string
    description: string
}

export type Metafield = {
    key: string
    value: string
}

export type Price = {
    amount: string
    currencyCode: string
}

export type VariantPrice = {
    minVariantPrice: Price
    maxVariantPrice: Price
}

export type Option = {
    id: string
    name: string
    values: Array<string>
}

export type ProductVariant = {
    id: string
    price: Price
    compareAtPrice: Price | null
    selectedOptions: ProductVariantSelectedOptions[]
    image: ImageT
    product: Pick<Product, "title" | "handle" | "id">
}

export type ProductVariantSelectedOptions = {
    name: string
    value: string
}

export type ProductCollection = {
    id: string
    handle: string
    title: string
    description: string
    products: {
        nodes: Array<Pick<Product, "handle" | "title">>
    }
}

export type ProductCollectionInfo = Omit<ProductCollection, "products">

export type ProductCollections = {
    nodes: ProductCollection[]
}

export type Product = {
    id: string
    title: string
    handle: string
    availableForSale: boolean
    description?: string
    descriptionHtml?: string
    collections: ProductCollections
    featuredImage?: ImageT
    images?: {
        nodes: ImageT[]
    }
    compareAtPriceRange: VariantPrice
    priceRange: VariantPrice
    metafields: Metafield[]
    options: Option[]
    variants: {
        nodes: ProductVariant[]
    }
}

export type SearchQuery = {
    data: {
        search: {
            totalCount: number
            nodes: Product[]
        }
    }
}

export type Article = {
    id: string
    handle: string
    title: string
    content?: string
    contentHtml?: string
    image?: ImageT
    publishedAt: Date
}

export type ArticlesInfo = {
    pageInfo: PageInfo
    edges: ArticleEdge[]
}

export type BillboardQuery = {
    data: {
        blog: {
            articles: {
                nodes: Article[]
            }
        }
    }
}

export type ArticleByHandleQuery = {
    data: {
        blog: {
            articleByHandle: Article | null
        }
    }
}

export type ArticleEdge = {
    cursor: string
    node: Article
}

export type SitemapArticleEdge = {
    node: {
        handle: string
        publishedAt: Date
    }
}

export type ArticlesQuery = {
    data: {
        blog: {
            articles: ArticlesInfo
        }
    }
}

export type ProductsEdge = {
    cursor: string
    node: Product
}

export type SitemapProductsEdge = {
    node: {
        handle: string
        updatedAt: Date
    }
}

export type ProductsFromCollectionQuery = {
    data: {
        collection: {
            products: {
                edges: ProductsEdge[]
            }
        }
    }
}

export type CollectionInfoByHandleQuery = {
    data: {
        collection: ProductCollectionInfo
    }
}

export type ProductsQuery = {
    data: {
        products: {
            edges: ProductsEdge[]
        }
    }
}

export type Address = {
    address1?: string
    country?: string
    city?: string
    latitude?: number
    longitude?: number
    phone?: string
    zip?: string
}

export type Location = {
    name?: string
    address?: Address
}

export type LocationsQuery = {
    data: {
        locations: {
            nodes: Location[]
        }
    }
}

export type ProductQuery = {
    data: {
        product: Product
    }
}

export type ProductRecommendationsQuery = {
    data: {
        productRecommendations: Product[]
    }
}

export type Cart = {
    id: string
    buyerIdentity: CartBuyerIdentity
    checkoutUrl: string
    updatedAt: Date
    createdAt: Date
    note: string
    totalQuantity: number
    cost: {
        totalAmount: Price
    }
    lines: {
        nodes: CartLinesNode[]
    }
}

export type CartLinesNode = {
    id: string
    quantity: number
    merchandise: ProductVariant
    cost: {
        amountPerQuantity: Price
        totalAmount: Price
    }
}

export type CartInputLine = {
    quantity: number
    merchandiseId: string
}

export type CartLineUpdateInput = {
    quantity: number
    id: string
}

export type CreateCartQuery = {
    data: {
        cartCreate: {
            cart: Cart
        }
    }
}

export type CartQuery = {
    data: {
        cart: Cart
    }
}

export type CartLinesUpdateQuery = {
    data: {
        cartLinesUpdate: {
            cart: Cart
        }
    }
}

export type CartLinesAddQuery = {
    data: {
        cartLinesAdd: CartLinesAdd
    }
}

export type CartLinesAdd = {
    cart: Cart
    userErrors: CartUserError[]
}

export type CartLinesRemovePayload = CartLinesAdd

export type CartLinesRemoveQuery = {
    data: {
        cartLinesRemove: CartLinesRemovePayload
    }
}

export type CartUserError = {
    message: string
    field: Array<string>
}

export type CartBuyerIdentityInput = {
    customerAccessToken: string | null
}

export type CartBuyerIdentityUpdateQuery = {
    data: {
        cartBuyerIdentityUpdate: {
            cart: Cart
            userErrors: CartUserError[]
        }
    }
}

export type CartBuyerIdentity = {
    customer?: Customer
}

export type CustomerCreateQuery = {
    data: {
        customerCreate: CustomerCreatePayload
    }
}

export type CustomerCreatePayload = {
    customer?: Customer
    customerUserErrors: CustomerUserErrors
}

export type CustomerUserErrors = {
    message: string
}[]

export type CustomerQuery = {
    data: {
        customer: Customer
    }
}

export type Customer = {
    id: string
    email: string
    acceptsMarketing: boolean
    displayName: string
    firstName?: string
    lastName?: string
    numberOfOrders: string
    phone?: string
    orders: OrderConnection
    createdAt: Date
    updatedAt: Date
}

export type CustomerWithEncryptedAccessToken = Customer & {
    encryptedCustomerAccessToken?: string
    sessionExpired?: boolean
    wishlist?: Wishlist | null
}

export type DecryptedCustomerAccessToken = string | jwt.JwtPayload

export type OrderConnection = {
    nodes: Order[]
    totalCount: string
}

export type Order = {
    id: string
    name: string
    orderNumber: number
    statusUrl: string
    totalPrice: Price
    processedAt: Date
    lineItems: OrderLineItemConnection
}

export type OrderLineItemConnection = {
    nodes: OrderLineItem[]
}

export type OrderLineItem = {
    title: string
    currentQuantity: number
    quantity: number
}

export type CustomerCreateInput = Omit<SignUpSchema, "confirmPassword">
export type CustomerUpdateInput = Omit<UpdateUserSchema, "confirmPassword">
export type CustomerResetInput = Omit<ResetUserSchema, "confirmPassword">

export type CustomerUpdate = {
    customer: Customer
    customerAccessToken: CustomerAccessToken | null
    customerUserErrors: CustomerUserErrors
}

export type CustomerUpdateReturn = Omit<CustomerUpdate, "customerAccessToken"> & {
    encryptedCustomerAccessToken: string
}

export type CustomerUpdateQuery = {
    data: {
        customerUpdate: CustomerUpdate | null
    }
}

export type CustomerAccessTokenCreateQuery = {
    data: {
        customerAccessTokenCreate: CustomerAccessTokenCreatePayload
    }
}

export type CustomerAccessTokenCreatePayload = {
    customerAccessToken: CustomerAccessToken
    customerUserErrors: CustomerUserErrors
}

export type CustomerAccessToken = {
    accessToken: string
    expiresAt: Date
}

export type CustomerRecoverQuery = {
    data: {
        customerRecover: {
            customerUserErrors: CustomerUserErrors
        }
    }
}

export type CustomerResetQuery = {
    data: {
        customerReset: CustomerReset
    }
}

export type CustomerReset = {
    customer: Customer
    customerAccessToken: CustomerAccessToken | null
    customerUserErrors: CustomerUserErrors
}

export type FilterItems = FilterItem[]

export type FilterItem = {
    label: string
    items: Filters
}

export type Filters =
    | ColorsFilter[]
    | MaterialsFilter[]
    | WeightsFilter[]
    | ReelSizesFilter[]
    | BoatSizesFilter[]
    | LineSizesFilter[]
    | HookSizesFilter[]
    | RodLengthFilter[]
    | AvailabilityFilter[]
    | BrandsFilter[]

export type BrandsFilter = {
    label: string
}

export type ColorsFilter = {
    label: string
    color: string
}

export type WeightsFilter = {
    label: string
}

export type MaterialsFilter = {
    label: string
}

export type ReelSizesFilter = {
    label: string
}

export type BoatSizesFilter = {
    label: string
}

export type HookSizesFilter = {
    label: string
}

export type LineSizesFilter = {
    label: string
}

export type RodLengthFilter = {
    label: string
}

export type LureLengthFilter = {
    label: string
}

export type AvailabilityFilter = {
    label: string
    value: boolean
}
