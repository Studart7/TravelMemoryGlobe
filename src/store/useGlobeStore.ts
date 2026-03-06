import { create } from 'zustand'

export interface Photo {
    id: string;
    url: string;
    thumbnailUrl?: string;
    name: string;
    createdAt: string;
}

export interface Pin {
    id: string;
    latitude: number;
    longitude: number;
    location: string;
    dateDisplay: string;
    notes?: string;
    photos: Photo[];
    memoryDate: string; // ISO string for sorting
    createdAt: string;
}

export type FocusSource = 'click' | 'search' | 'list' | 'create' | null;

interface GlobeState {
    pins: Pin[];
    activePinId: string | null;
    focusSource: FocusSource;
    searchTerm: string;
    isAddMode: boolean;
    sortOrder: 'name' | 'date';
    isSidebarOpen: boolean;

    // Modal state
    isModalOpen: boolean;
    pendingCoords: { lat: number; lng: number } | null;

    addPin: (pin: Omit<Pin, 'id'>) => void;
    updatePin: (id: string, data: Partial<Omit<Pin, 'id'>>) => void;
    removePin: (id: string) => void;
    setActivePin: (id: string | null, source?: FocusSource) => void;
    setSearchTerm: (term: string) => void;
    setIsAddMode: (isAddMode: boolean) => void;
    setSortOrder: (order: 'name' | 'date') => void;
    setIsSidebarOpen: (isOpen: boolean) => void;

    // Modal actions
    openModal: (coords: { lat: number; lng: number }) => void;
    closeModal: () => void;
}

export const useGlobeStore = create<GlobeState>((set) => ({
    pins: [],
    activePinId: null,
    focusSource: null,
    searchTerm: '',
    isAddMode: false,
    sortOrder: 'date',
    isSidebarOpen: false,

    isModalOpen: false,
    pendingCoords: null,

    addPin: (pinData) => set((state) => ({
        pins: [...state.pins, { ...pinData, id: crypto.randomUUID() }]
    })),
    updatePin: (id, data) => set((state) => ({
        pins: state.pins.map(pin => pin.id === id ? { ...pin, ...data } : pin)
    })),
    removePin: (id) => set((state) => ({
        pins: state.pins.filter(pin => pin.id !== id),
        activePinId: state.activePinId === id ? null : state.activePinId,
        focusSource: state.activePinId === id ? null : state.focusSource
    })),
    setActivePin: (id, source = 'click') => set({
        activePinId: id,
        focusSource: id ? source : null
    }),
    setSearchTerm: (term) => set({ searchTerm: term }),
    setIsAddMode: (isAddMode) => set({ isAddMode }),
    setSortOrder: (sortOrder) => set({ sortOrder }),
    setIsSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),

    openModal: (coords) => set({ isModalOpen: true, pendingCoords: coords, isAddMode: false }),
    closeModal: () => set({ isModalOpen: false, pendingCoords: null })
}))
