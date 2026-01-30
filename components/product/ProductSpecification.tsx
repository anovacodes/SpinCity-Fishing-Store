import { Metafield } from "@/lib/shopify/types"
import { FC } from "react"

interface ProductSpecificationProps {
    metafields: Metafield[]
}

const ProductSpecification: FC<ProductSpecificationProps> = ({ metafields }) => {
    return (
        <div>
            <h2 className="text-xl font-semibold text-neutral-600 mb-8">Specification</h2>

            <table className="w-full">
                <tbody>
                    {metafields.map((metafield) => {
                        if (!metafield) {
                            return null
                        }

                        const fixedKey = metafield.key.split("_").join(" ")

                        return (
                            <tr key={metafield.key} className="odd:bg-neutral-100">
                                <td className="w-1/2 text-neutral-700 font-medium py-2">{`${fixedKey[0].toUpperCase()}${fixedKey.slice(1)}`}</td>
                                <td className="w-1/2 text-neutral-700 py-2">{metafield.value}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ProductSpecification
