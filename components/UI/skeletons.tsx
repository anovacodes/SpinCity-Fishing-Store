import Container from "../Container"

export const CardSkeleton = () => {
    return <div className="bg-neutral-100 h-[430px] w-full rounded-lg"></div>
}

export const CardSkeletons = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[30px]">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
        </div>
    )
}

export const HeadingSkeleton = () => {
    return <div className="mb-11 h-8 bg-neutral-100 w-1/4 rounded-md"></div>
}

export const ProductsSliderSkeleton = () => {
    return (
        <div className="my-[80px] pb-10">
            <Container>
                <HeadingSkeleton />

                <CardSkeletons />
            </Container>
        </div>
    )
}

export const BestSellingSkeleton = () => {
    return (
        <div className="my-[80px]">
            <Container>
                <HeadingSkeleton />

                <CardSkeletons />

                <div className="w-36 h-[30px] bg-neutral-100 mt-[30px] mx-auto rounded-md"></div>
            </Container>
        </div>
    )
}

export const BlogsPreviewSkeleton = () => {
    return (
        <div className="my-[80px]">
            <Container>
                <HeadingSkeleton />

                <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    <li className="h-[503px] bg-neutral-100"></li>
                    <li className="h-[503px] bg-neutral-100"></li>
                    <li className="h-[503px] bg-neutral-100"></li>
                </ul>
            </Container>
        </div>
    )
}

export const PartnersLogosSkeleton = () => {
    return (
        <div className="my-[80px]">
            <Container>
                <HeadingSkeleton />

                <ul className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-10">
                    <li className="h-[205px] bg-neutral-100"></li>
                    <li className="h-[205px] bg-neutral-100"></li>
                    <li className="h-[205px] bg-neutral-100"></li>
                    <li className="h-[205px] bg-neutral-100"></li>
                    <li className="h-[205px] bg-neutral-100"></li>
                    <li className="h-[205px] bg-neutral-100"></li>
                </ul>
            </Container>
        </div>
    )
}

export const ProductSkeleton = () => {
    return (
        <div className="md:py-[30px]">
            <Container>
                <div className="h-[571px] grid grid-cols-1 lg:grid-cols-[42%_55%] justify-between gap-10 mb-20">
                    <div>
                        <div className="bg-neutral-100 h-[400px] rounded-xl mb-[10px]"></div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[10px]">
                            <div className="bg-neutral-100 h-[161.75px] rounded-xl"></div>
                            <div className="bg-neutral-100 h-[161.75px] rounded-xl"></div>
                            <div className="bg-neutral-100 hidden md:block h-[161.75px] rounded-xl"></div>
                            <div className="bg-neutral-100 hidden lg:block h-[161.75px] rounded-xl"></div>
                        </div>
                    </div>
                    <div>
                        <div className="bg-neutral-100 w-1/2 h-[53px] pb-5 mb-5"></div>
                        <div className="bg-neutral-100 w-1/3 h-[173px] pb-6"></div>
                        <div className="bg-neutral-100 w-1/4 h-8 my-5"></div>
                        <div className="bg-neutral-100 w-1/2 h-[52px]"></div>
                    </div>
                </div>

                <div className="h-[571px] grid grid-cols-1 lg:grid-cols-[42%_55%] justify-between gap-10 mb-20">
                    <div className="h-full bg-neutral-100"></div>

                    <div>
                        <div className="bg-neutral-100 h-7 mb-8"></div>
                        <div className="bg-neutral-100 h-7 w-40 mb-6"></div>
                        <div className="bg-neutral-100 h-[57px] mb-6"></div>
                        <div className="bg-neutral-100 h-[208px] mb-6"></div>
                        <div className="bg-neutral-100 h-[50px] w-[141px] mb-8"></div>
                        <div className="bg-neutral-100 h-7 w-40 mb-6"></div>
                        <div className="bg-neutral-100 h-[208px]"></div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export const BillboardSkeleton = () => {
    return (
        <Container>
            <div className="w-full h-[605px] bg-neutral-100"></div>
        </Container>
    )
}
