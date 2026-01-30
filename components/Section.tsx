import type { DetailedHTMLProps, FC, HTMLAttributes } from "react"
import Container from "./Container"
import Heading from "./Heading"
import { cn } from "@/utils/utils"

type SectionProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>

const Section: FC<SectionProps> = ({ title, children, className, ...rest }) => {
    return (
        <section className={cn("py-20", className)} {...rest}>
            <Container>
                {title && <Heading title={title} />}

                {children}
            </Container>
        </section>
    )
}

export default Section
