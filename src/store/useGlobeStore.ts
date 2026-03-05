import { create } from 'zustand'

export interface Pin {
    id: string;
    latitude: number;
    longitude: number;
    title?: string;
    notes?: string;
    date?: string;
}

interface GlobeState {
    pins: Pin[];
    activePinId: string | null;
    searchTerm: string;
    addPin: (pin: Omit<Pin, 'id'>) => void;
    removePin: (id: string) => void;
    setActivePin: (id: string | null) => void;
    setSearchTerm: (term: string) => void;
}

export const useGlobeStore = create<GlobeState>((set) => ({
    pins: [],
    activePinId: null,
    searchTerm: '',
    addPin: (pinData) => set((state) => ({
        pins: [...state.pins, { ...pinData, id: crypto.randomUUID() }]
    })),
    removePin: (id) => set((state) => ({
        pins: state.pins.filter(pin => pin.id !== id),
        activePinId: state.activePinId === id ? null : state.activePinId
    })),
    setActivePin: (id) => set({ activePinId: id }),
    setSearchTerm: (term) => set({ searchTerm: term })
}))
