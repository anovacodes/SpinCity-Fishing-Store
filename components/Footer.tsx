import { roboto } from "@/utils/fonts"
import Container from "./Container"
import { LuHome } from "react-icons/lu"
import Link from "next/link"
import { FiMail, FiPhone } from "react-icons/fi"
import { getMenu } from "@/actions/shopify/getMenu"
import { footerMenuQuery } from "@/lib/shopify/queries/menu"
import { getLocations } from "@/actions/shopify/getLocations"
import Copyright from "./Copyright"

const Footer = async () => {
    const menu = await getMenu(footerMenuQuery, {
        handle: "footer"
    })
    const [location] = await getLocations()

    return (
        <footer className="mt-auto">
            <Container>
                <ul className="grid sm:grid-cols-2 xl:grid-cols-5 gap-8 sm:gap-20 border-b border-b-neutral-200 py-[60px]">
                    <li>
                        <h4 className="text-lg font-bold text-neutral-700 mb-[45px]">Contacts</h4>

                        <ul className={`${roboto.className} text-neutral-400 flex flex-col gap-5`}>
                            <li className="flex items-center gap-3">
                                <div className="min-w-[23px]">
                                    <LuHome size={23} />
                                </div>

                                <address>{location?.address?.address1 || "Address not specified"}</address>
                            </li>

                            <li className="flex items-center gap-3">
                                <div className="min-w-[23px]">
                                    <FiPhone size={23} />
                                </div>

                                <Link
                                    className="hover:text-neutral-600 transition-colors"
                                    href={`tel:${location?.address?.phone || ""}`}
                                >
                                    {location?.address?.phone || "Phone not specified"}
                                </Link>
                            </li>

                            <li className="flex items-center gap-3">
                                <div className="min-w-[23px]">
                                    <FiMail size={23} />
                                </div>

                                <Link
                                    className="hover:text-neutral-600 transition-colors"
                                    href="mailto:spincity2023@gmail.com"
                                >
                                    anovacodes@gmail.com
                                </Link>
                            </li>
                        </ul>
                    </li>

                    {menu?.map((item) => {
                        return (
                            <li key={item.title}>
                                <h4 className="text-lg font-bold text-neutral-700 mb-[45px]">{item.title}</h4>

                                <ul className="flex flex-col gap-3">
                                    {item.items?.map((i) => {
                                        const url = new URL(i.url)

                                        return (
                                            <li key={i.title}>
                                                <Link
                                                    className={`${roboto.className} text-neutral-400 hover:text-neutral-600 transition-colors`}
                                                    href={url.pathname === "/pages/blog" ? "/blog" : url.pathname}
                                                >
                                                    {i.title}
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </li>
                        )
                    })}

                    <li className="sm:col-start-1 sm:col-end-3 xl:col-auto">
                        <h4 className="text-lg font-bold text-neutral-700 mb-[45px]">Our guarantees</h4>

                        <div className={`${roboto.className} text-neutral-400`}>
                            Unhappy with your purchase? You can{" "}
                            <Link href="/pages/return" className="text-neutral-600 hover:underline">
                                return
                            </Link>{" "}
                            it within 30 days from the date of receipt
                        </div>
                    </li>
                </ul>

                <Copyright />
            </Container>
        </footer>
    )
}

export default Footer
