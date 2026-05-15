import { FC } from "react"
import { TbReload } from "react-icons/tb"

interface LoadMoreButtonProps {
    onClick: () => void
}

const LoadMoreButton: FC<LoadMoreButtonProps> = ({ onClick }) => {
    return (
        <form className="mt-[30px] flex justify-center" action={onClick}>
            <button
                className="flex items-center gap-3 text-neutral-500 hover:text-neutral-400 transition-colors"
                type="submit"
            >
                <TbReload size={30} />
                <span className="font-bold text-xl">Load more</span>
            </button>
        </form>
    )
}

export default LoadMoreButton
