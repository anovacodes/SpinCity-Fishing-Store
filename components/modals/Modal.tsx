"use client"

import { useDisableByScroll } from "@/hooks/useDisableByScroll"
import { FC, ReactNode, useCallback, useEffect, useState } from "react"
import { IoMdClose } from "react-icons/io"
import useScrollbarSize from "react-scrollbar-size"

interface ModalProps {
    isOpen?: boolean
    onClose: () => void
    children?: ReactNode
}

const Modal: FC<ModalProps> = ({ isOpen, children, onClose }) => {
    const [isActive, setIsActive] = useState(isOpen)
    const [closing, setClosing] = useState(false)
    const { width } = useScrollbarSize()

    useDisableByScroll(width, isActive)

    const handleClose = useCallback(() => {
        if (closing) return

        setClosing(true)
        setIsActive(false)
        setTimeout(() => {
            onClose()
            setClosing(false)
        }, 200)
    }, [closing, onClose])

    useEffect(() => {
        setIsActive(isOpen)
    }, [isOpen])

    if (!isOpen) return null

    return (
        <div
            className={`
                fixed inset-0
              bg-[rgba(0,0,0,0.5)] 
                z-[4000] 
              text-white 
                flex 
                items-center
                ${isActive ? "opacity-100" : "opacity-0"}
                transition-opacity
                duration-200
            `}
            onClick={handleClose}
        >
            <button
                className="fixed top-10 right-10 cursor-pointer hover:opacity-75 transition-opacity"
                type="button"
                onClick={handleClose}
            >
                <IoMdClose size={40} />
            </button>

            <div className="w-full h-[70vh]">{children}</div>
        </div>
    )
}

export default Modal
