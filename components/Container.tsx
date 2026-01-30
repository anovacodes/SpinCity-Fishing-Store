import { FC, ReactNode } from "react"

interface ContainerProps {
    children: ReactNode
}

const Container: FC<ContainerProps> = ({ children }) => {
    return (
        <div className="w-[min(1540px,100%-40px)] ms-auto me-auto">
            {children}
        </div>
    )
}

export default Container
