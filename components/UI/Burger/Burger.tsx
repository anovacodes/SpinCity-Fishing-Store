"use client"

import "./style.css"
import { useCatalog } from "@/hooks/useCatalog"

const Burger = () => {
    const { isActive, onOpen, onClose } = useCatalog()

    const toggleBurger = () => {
        isActive ? onClose() : onOpen()
    }

    return (
        <div className={`burger ${isActive ? "active" : ""}`} onClick={toggleBurger}>
            <span className="burger__item">Burger</span>
        </div>
    )
}

export default Burger
