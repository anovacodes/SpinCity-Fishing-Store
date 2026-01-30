import type { ImageT } from "@/lib/shopify/types"
import { create } from "zustand"

interface UseProductModalStore {
    initialSlide: number
    images: ImageT[]
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
    setImages: (images?: ImageT[]) => void
    setInitialSlide: (initialSlide: number) => void
}

export const useProductModal = create<UseProductModalStore>(set => ({
    initialSlide: 0,
    images: [],
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    setImages: (images?: ImageT[]) => set({ images }),
    setInitialSlide: (initialSlide: number) => set({ initialSlide })
}))