import { useState } from 'react';
import { useGlobeStore } from '../../store/useGlobeStore';
import { PhotoStack } from './PhotoStack';
import { PhotoGrid } from './PhotoGrid';
import { Lightbox } from './Lightbox';

export function PinDetailsPanel() {
    const activePinId = useGlobeStore((state) => state.activePinId);
    const setActivePin = useGlobeStore((state) => state.setActivePin);
    const pins = useGlobeStore((state) => state.pins);
    const removePin = useGlobeStore((state) => state.removePin);
    const openModal = useGlobeStore((state) => state.openModal);

    const [showGrid, setShowGrid] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const activePin = pins.find(p => p.id === activePinId);

    if (!activePinId || !activePin) return null;

    const handleDelete = () => {
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        removePin(activePinId);
        setShowDeleteConfirm(false);
    };

    const handleEdit = () => {
        openModal({ lat: activePin.latitude, lng: activePin.longitude });
    };

    const handleNextPhoto = () => {
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex + 1) % activePin.photos.length);
        }
    };

    const handlePrevPhoto = () => {
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex - 1 + activePin.photos.length) % activePin.photos.length);
        }
    };

    return (
        <>
            <div className="fixed bottom-0 md:top-6 md:right-6 z-40 w-full md:w-80 animate-in slide-in-from-bottom-10 md:slide-in-from-right-10 duration-300 pointer-events-auto">
                <div className="bg-slate-900/95 backdrop-blur-xl border-t md:border border-slate-700/50 rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] md:max-h-[calc(100vh-3rem)]">
                    {/* Header with Close Button */}
                    <div className="p-5 border-b border-slate-800/50 flex justify-between items-start bg-slate-900/40">
                        <div className="space-y-1">
                            <h3 className="font-bold text-white text-xl tracking-tight leading-tight truncate pr-2">
                                {activePin.location}
                            </h3>
                            <p className="text-blue-400 text-xs font-mono font-black tracking-widest uppercase opacity-90">
                                {activePin.dateDisplay}
                            </p>
                        </div>
                        <button
                            onClick={() => setActivePin(null)}
                            className="p-2 text-slate-400 hover:text-white transition-colors bg-slate-800/50 hover:bg-slate-700/50 rounded-xl flex-shrink-0"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="p-5 space-y-6 overflow-y-auto custom-scrollbar">
                        {/* Photo Stack */}
                        <PhotoStack
                            photos={activePin.photos}
                            onExpand={() => setShowGrid(true)}
                            onPhotoClick={(idx) => setLightboxIndex(idx)}
                        />

                        {/* Coordinates & Metadata */}
                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-slate-950/40 p-3 rounded-2xl border border-slate-800/30">
                                <span className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-1">Latitude</span>
                                <span className="text-sm font-mono text-blue-300">{activePin.latitude.toFixed(4)}</span>
                            </div>
                            <div className="bg-slate-950/40 p-3 rounded-2xl border border-slate-800/30">
                                <span className="block text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-1">Longitude</span>
                                <span className="text-sm font-mono text-blue-300">{activePin.longitude.toFixed(4)}</span>
                            </div>
                        </div>

                        {/* Notes Section */}
                        {activePin.notes && (
                            <div className="space-y-2">
                                <span className="block text-[10px] uppercase tracking-widest font-bold text-slate-500">Memories</span>
                                <div className="bg-slate-950/20 p-4 rounded-2xl border border-slate-800/20 italic text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                                    "{activePin.notes}"
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Action Footer */}
                    <div className="p-4 bg-slate-900/60 border-t border-slate-800/50 grid grid-cols-2 gap-3 pb-8 md:pb-4">
                        <button
                            onClick={handleEdit}
                            className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-bold text-xs transition-all flex items-center justify-center gap-2 active:scale-95"
                        >
                            <span>✏️</span> Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-4 py-3 bg-red-950/30 hover:bg-red-600 border border-red-900/30 hover:border-red-500 text-red-500 hover:text-white rounded-2xl font-bold text-xs transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-red-950/20"
                        >
                            <span>🗑️</span> Delete
                        </button>
                    </div>
                </div>
            </div>

            {/* Overlays */}
            {showGrid && (
                <PhotoGrid
                    photos={activePin.photos}
                    onClose={() => setShowGrid(false)}
                    onPhotoClick={(idx) => {
                        setShowGrid(false);
                        setLightboxIndex(idx);
                    }}
                />
            )}

            {lightboxIndex !== null && activePin.photos[lightboxIndex] && (
                <Lightbox
                    photo={activePin.photos[lightboxIndex]}
                    onClose={() => setLightboxIndex(null)}
                    onNext={handleNextPhoto}
                    onPrev={handlePrevPhoto}
                    hasMultiple={activePin.photos.length > 1}
                />
            )}

            {/* Delete Confirmation Overlay */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-8 animate-in fade-in duration-200">
                    <div className="bg-slate-900 border border-slate-700/50 rounded-3xl p-8 max-w-sm w-full text-center space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto border border-red-500/20 text-4xl">
                            ⚠️
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-white tracking-tight">Delete Memory?</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Are you sure you want to delete <span className="text-white font-bold">"{activePin.location}"</span>? This action cannot be undone.
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 pt-2">
                            <button
                                onClick={confirmDelete}
                                className="w-full py-4 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-red-900/20 active:scale-95"
                            >
                                Yes, Delete Memory
                            </button>
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-2xl font-bold transition-all active:scale-95"
                            >
                                No, Keep It
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
