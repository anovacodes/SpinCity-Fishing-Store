import { useEffect } from "react"

export const useDisableByScroll = (width: number, isActive?: boolean) => {
    useEffect(() => {
        if (isActive) {
            document.body.style.overflow = "hidden"
            document.body.style.position = "relative"
            document.body.style.right = `${width / 2}px`
            
        } else {
            setTimeout(() => {
                document.body.style.overflow = 'unset'
                document.body.style.right = `0px`
            }, 200)
        }
    }, [ isActive, width ])
}