import { baseUrl } from "@/config/settings.config"
import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
    return {
        host: baseUrl,
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: "/profile/"
        },
        sitemap: `${baseUrl}/sitemap.xml`
    }
}