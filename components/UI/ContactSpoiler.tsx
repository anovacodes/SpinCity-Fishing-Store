import Link from "next/link"
import { FiPhone } from "react-icons/fi"

const PHONES: Array<string> = [
    "+38 (067) 649 62 31",
    "+38 (098) 732 54 41",
    "+38 (050) 964 50 12",
    "+38 (044) 430 23 95"
]

const ContactSpoiler = () => {
    if (PHONES.length <= 0) return null

    const clearPhones = PHONES.map((phone) => {
        return phone.replace(/\(|\)/g, "").split(" ").join("")
    })

    return (
        <div className="group flex items-center gap-2 text-neutral-400">
            <FiPhone size={28} />
            <div className="relative">
                <Link href={`tel:${clearPhones[0]}`} className="hover:text-rose-600 transition-colors">
                    {PHONES[0]}
                </Link>

                <ul className="absolute top-[110%] left-1/2 -translate-x-[50%] overflow-hidden w-max hidden group-hover:flex flex-col shadow-md bg-white p-4 z-20 rounded-md transition-transform">
                    {PHONES.map((phone, index) => (
                        <li key={phone} className="group/item">
                            <Link
                                href={`tel:${clearPhones[index]}`}
                                className="block py-1 group-first/item:pt-0 group-last/item:pb-0 hover:text-rose-600 transition-colors"
                            >
                                {phone}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ContactSpoiler
