import { isDev } from "@/config/settings.config"
import prisma from "@/lib/prisma/prismadb"
import { cache } from "@/utils/cache"
import type { Review } from "@prisma/client"

export const getReviews = cache(
    async (productHandle: string): Promise<Review[]> => {
        try {
            if (!productHandle) {
                throw new Error("Invalid product handle")
            }

            const product = await prisma.product.findUnique({
                where: { productHandle }
            })

            if (!product) {
                return []
            }

            const reviews = await prisma.review.findMany({
                where: { productHandle },
                orderBy: {
                    createdAt: "desc"
                }
            })

            return reviews
        } catch (error) {
            if (error instanceof Error && isDev) {
                console.error("GET REVIEWS FROM PRISMA ERROR: ", error.message)
            }

            return []
        }
    },
    {
        tags: ["reviews"],
        revalidate: 300
    }
)
