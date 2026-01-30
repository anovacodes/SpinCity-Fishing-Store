import Container from "@/components/Container"
import Products from "@/components/product/Products"
import { allProductsFromCollectionVariable } from "@/lib/shopify/variables"
import { productsFromCollectionQuery } from "@/lib/shopify/queries/products"
import { getProductsFromCollection } from "@/actions/shopify/getProductsFromCollection"
import Sidebar from "@/components/Sidebar"
import getCurrentUser from "@/actions/auth/getCurrentUser"
import { FC } from "react"
import { collectionSearchParamsSchema } from "@/lib/zod/schema"
import { CollectionSearchParamsSchema } from "@/lib/zod/types"
import { STORE_SETTINGS } from "@/config/settings.config"
import Breadcrumbs, { Breadcrumb } from "@/components/UI/Breadcrumbs"
import { Metadata } from "next"
import { getCollectionInfoByHandle } from "@/actions/shopify/getCollectionInfoByHandle"
import { notFound } from "next/navigation"

interface CollectionPageProps {
    params: {
        slug: Array<string>
    }
    searchParams: CollectionSearchParamsSchema
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
    const { slug } = params

    const collectionInfo = await getCollectionInfoByHandle(slug.at(-1))

    if (!collectionInfo) {
        notFound()
    }

    const { title } = collectionInfo

    return {
        title
    }
}

const CollectionPage: FC<CollectionPageProps> = async ({ params, searchParams }) => {
    const { slug } = params

    const parsedSearchParams = collectionSearchParamsSchema.safeParse(searchParams)

    if (!parsedSearchParams.success) {
        throw new Error("Search params parsing error. Please use only valid search params.")
    }

    const { min, max, brand, size, material, color, available, length } = parsedSearchParams.data

    const filterItems: Array<unknown> = []

    const currentUser = await getCurrentUser()

    if (typeof min === "number" && typeof max === "number") {
        filterItems.push({
            price: { min, max }
        })
    }

    if (typeof available === "string") {
        filterItems.push({
            available: JSON.parse(available)
        })
    }

    if (brand) {
        handleVariantOption("Brand", brand)
    }

    if (material) {
        handleVariantOption("Material", material)
    }

    if (color) {
        handleVariantOption("Color", color)
    }

    if (size) {
        handleVariantOption("Size", size)
    }

    if (length) {
        handleVariantOption("Length", length)
    }

    const productsEdges = await getProductsFromCollection(
        productsFromCollectionQuery,
        allProductsFromCollectionVariable(slug, STORE_SETTINGS.productsFromCollectionCount, filterItems)
    )

    function handleVariantOption(name: string, data: string | Array<string>) {
        if (Array.isArray(data)) {
            data.forEach((item) => {
                let value = item[0].toUpperCase() + item.slice(1)

                if (name === "Size") {
                    value = value.toUpperCase()
                }

                if (name === "Brand") {
                    return filterItems.push({
                        productVendor: item
                    })
                }

                filterItems.push({
                    variantOption: { name, value }
                })
            })
        } else {
            let value = data[0].toUpperCase() + data.slice(1)

            if (name === "Size") {
                value = value.toUpperCase()
            }

            if (name === "Brand") {
                return filterItems.push({
                    productVendor: brand
                })
            }

            filterItems.push({
                variantOption: { name, value }
            })
        }
    }

    const breadcrumbs: Array<Breadcrumb> = slug.map((item) => {
        const label = item
            .split("-")
            .map((i) => i[0].toUpperCase() + i.slice(1))
            .join(" ")

        return {
            href: `/collections/${item}`,
            label
        }
    })

    return (
        <div
            className={`
            ${breadcrumbs.length >= 2 ? "p-0" : "pt-[30px]"}
        `}
        >
            <Container>
                {breadcrumbs.length >= 2 && <Breadcrumbs items={breadcrumbs} />}

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_4fr] gap-[30px] justify-between">
                    <Sidebar collectionName={slug[0]} productsEdges={productsEdges} />
                    <Products
                        productsEdges={productsEdges}
                        type="products-from-collection"
                        itemsPerPage={STORE_SETTINGS.productsFromCollectionCount}
                        variables={allProductsFromCollectionVariable(
                            slug,
                            STORE_SETTINGS.productsFromCollectionCount,
                            filterItems
                        )}
                        currentUser={currentUser}
                    />
                </div>
            </Container>
        </div>
    )
}

export default CollectionPage
