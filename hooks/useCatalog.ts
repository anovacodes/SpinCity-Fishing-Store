import { create } from "zustand"

interface UseCatalogStore {
    isActive: boolean
    onOpen: () => void
    onClose: () => void
}

export const useCatalog = create<UseCatalogStore>(set => ({
    isActive: false,
    onOpen: () => set({ isActive: true }),
    onClose: () => set({ isActive: false })
}))