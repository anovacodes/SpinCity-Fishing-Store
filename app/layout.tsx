import "./globals.css"
import type { Metadata, Viewport } from "next"
import { poppins } from "@/utils/fonts"
import Header from "@/components/Header/Header"
import Footer from "@/components/Footer"
import ProductModal from "@/components/modals/ProductModal"
import { Toaster } from "react-hot-toast"
import getCurrentUser from "@/actions/auth/getCurrentUser"
import { baseUrl, STORE_SETTINGS } from "@/config/settings.config"
import { shortenText } from "@/utils/utils"
import { getShopInfo } from "@/actions/shopify/getShopInfo"
import { envVariables } from "@/config/env.config"
import CartHelper from "@/components/helpers/CartHelper"
import AuthHelper from "@/components/helpers/AuthHelper"

export const viewport: Viewport = {
    themeColor: "rgb(255, 29, 72)"
}

export async function generateMetadata(): Promise<Metadata> {
    const shopInfo = await getShopInfo()

    const websiteName = shopInfo?.name ?? envVariables.DEFAULT_WEBSITE_NAME
    const description = shopInfo?.description ?? ""

    const shortDescription = shortenText(description, 190)

    return {
        metadataBase: new URL(baseUrl),
        title: {
            template: `%s | ${websiteName}`,
            default: `${websiteName}`
        },
        description: shortDescription,
        keywords: ["fishing", "spincity", "fishing rods", "fishing reels", "hooks", "fishing gear"],
        robots: {
            index: true,
            follow: true
        },
        openGraph: {
            title: `${websiteName} - Fishing Gear and more`,
            description: shortDescription,
            url: "/",
            siteName: websiteName,
            type: "website",
            images: [
                {
                    url: "/opengraph-image.jpg",
                    width: 1200,
                    height: 630
                }
            ]
        }
    }
}

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
    const currentUser = await getCurrentUser()

    return (
        <html lang="en" className={poppins.className}>
            <body className="bg-white flex flex-col leading-normal">
                <Header currentUser={currentUser} />

                <div className="pt-[145px] sm:pt-[163.98px] md:pt-[183.98px]">{children}</div>

                <Footer />

                <ProductModal />
                <Toaster
                    toastOptions={{
                        duration: STORE_SETTINGS.notificationVisibilityTime,
                        success: { style: { background: "rgb(83, 83, 83)", color: "#fff" } },
                        error: { style: { background: "#e11d48", color: "#fff" } }
                    }}
                />
                <CartHelper currentUser={currentUser} />
                <AuthHelper sessionExpired={currentUser?.sessionExpired} />
            </body>
        </html>
    )
}

export default RootLayout
