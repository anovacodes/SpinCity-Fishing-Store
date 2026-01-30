import Partners from "@/components/Partners/Partners"
import { fishingReelsSliderVariables, lineSliderVariables } from "@/lib/shopify/variables"
import { Suspense } from "react"
import {
    BestSellingSkeleton,
    BillboardSkeleton,
    BlogsPreviewSkeleton,
    PartnersLogosSkeleton,
    ProductsSliderSkeleton
} from "@/components/UI/skeletons"
import ProductsSliderWrapper from "@/components/product/ProductsSliderWrapper"
import BillboardWrapper from "@/components/BillboardWrapper"
import getCurrentUser from "@/actions/auth/getCurrentUser"
import BestSelling from "@/components/BestSelling"
import BlogsPreview from "@/components/BlogsPreview"

const HomePage = async () => {
    const currentUser = await getCurrentUser()

    return (
        <>
            <Suspense fallback={<BillboardSkeleton />}>
                <BillboardWrapper handle="billboard-hero" />
            </Suspense>

            <Suspense fallback={<BestSellingSkeleton />}>
                <BestSelling currentUser={currentUser} />
            </Suspense>

            <Suspense fallback={<BillboardSkeleton />}>
                <BillboardWrapper handle="billboard-middle" />
            </Suspense>

            <Suspense fallback={<ProductsSliderSkeleton />}>
                <ProductsSliderWrapper
                    title="Fishing reels"
                    currentUser={currentUser}
                    variables={fishingReelsSliderVariables()}
                    className="pb-0"
                />
            </Suspense>

            <Suspense fallback={<ProductsSliderSkeleton />}>
                <ProductsSliderWrapper
                    title="Line"
                    currentUser={currentUser}
                    variables={lineSliderVariables()}
                    className="pb-0"
                />
            </Suspense>

            <Suspense fallback={<BlogsPreviewSkeleton />}>
                <BlogsPreview />
            </Suspense>

            <Suspense fallback={<PartnersLogosSkeleton />}>
                <Partners />
            </Suspense>
        </>
    )
}

export default HomePage
