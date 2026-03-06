import React, { useState, useEffect } from 'react';
import { useGlobeStore, Photo } from '../../store/useGlobeStore';

export function PinModal() {
    const isModalOpen = useGlobeStore((state) => state.isModalOpen);
    const closeModal = useGlobeStore((state) => state.closeModal);
    const pendingCoords = useGlobeStore((state) => state.pendingCoords);
    const activePinId = useGlobeStore((state) => state.activePinId);
    const pins = useGlobeStore((state) => state.pins);
    const addPin = useGlobeStore((state) => state.addPin);
    const updatePin = useGlobeStore((state) => state.updatePin);

    const editingPin = activePinId ? pins.find(p => p.id === activePinId) : null;

    const [location, setLocation] = useState('');
    const [dateDisplay, setDateDisplay] = useState('');
    const [memoryDate, setMemoryDate] = useState(new Date().toISOString().split('T')[0]);
    const [notes, setNotes] = useState('');
    const [localPhotos, setLocalPhotos] = useState<Photo[]>([]);
    const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);

    // Initial state for dirty check
    const isDirty = (
        location !== (editingPin?.location || '') ||
        dateDisplay !== (editingPin?.dateDisplay || '') ||
        memoryDate !== (editingPin?.memoryDate || new Date().toISOString().split('T')[0]) ||
        notes !== (editingPin?.notes || '') ||
        localPhotos.length !== (editingPin?.photos.length || 0)
    );

    useEffect(() => {
        if (isModalOpen) {
            if (editingPin) {
                setLocation(editingPin.location);
                setDateDisplay(editingPin.dateDisplay);
                setMemoryDate(editingPin.memoryDate.split('T')[0]);
                setNotes(editingPin.notes || '');
                setLocalPhotos(editingPin.photos || []);
            } else {
                setLocation('');
                setDateDisplay('');
                setMemoryDate(new Date().toISOString().split('T')[0]);
                setNotes('');
                setLocalPhotos([]);
            }
            setShowDiscardConfirm(false);
        }
    }, [isModalOpen, editingPin]);

    if (!isModalOpen || (!pendingCoords && !editingPin)) return null;

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const newPhotos = Array.from(files).map(file => ({
            id: Math.random().toString(36).substr(2, 9),
            url: URL.createObjectURL(file),
            name: file.name,
            createdAt: new Date().toLocaleDateString()
        }));

        setLocalPhotos(prev => [...prev, ...newPhotos]);
    };

    const removeLocalPhoto = (id: string) => {
        setLocalPhotos(prev => prev.filter(p => p.id !== id));
    };

    const handleClose = () => {
        if (isDirty) {
            setShowDiscardConfirm(true);
        } else {
            closeModal();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!location.trim()) return;

        if (editingPin) {
            updatePin(editingPin.id, {
                location,
                dateDisplay,
                memoryDate: new Date(memoryDate).toISOString(),
                notes,
                photos: localPhotos
            });
        } else if (pendingCoords) {
            addPin({
                latitude: pendingCoords.lat,
                longitude: pendingCoords.lng,
                location: location,
                dateDisplay: dateDisplay,
                memoryDate: new Date(memoryDate).toISOString(),
                notes: notes,
                photos: localPhotos,
                createdAt: new Date().toISOString(),
            });
        }

        closeModal();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            {/* Modal Content */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 relative max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/40 flex-shrink-0">
                    <h2 className="text-xl font-bold text-white tracking-tight">
                        {editingPin ? 'Edit Memory' : 'New Travel Memory'}
                    </h2>
                    <button
                        onClick={handleClose}
                        className="p-2 text-slate-400 hover:text-white transition-colors bg-slate-800/50 hover:bg-slate-700/50 rounded-lg"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto custom-scrollbar flex-1">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Location</label>
                            <input
                                autoFocus
                                required
                                type="text"
                                placeholder="Ex: Paris, France"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Sort Date</label>
                                <input
                                    required
                                    type="date"
                                    value={memoryDate}
                                    onChange={(e) => setMemoryDate(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Display Date</label>
                                <input
                                    type="text"
                                    placeholder="Ex: Summer 2021"
                                    value={dateDisplay}
                                    onChange={(e) => setDateDisplay(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Notes (Optional)</label>
                            <textarea
                                rows={3}
                                placeholder="What do you remember about this place?"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none font-medium text-sm leading-relaxed"
                            />
                        </div>

                        {/* Photo Upload Section */}
                        <div className="space-y-3">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Photos</label>
                            <div className="grid grid-cols-4 gap-2">
                                {localPhotos.map((photo) => (
                                    <div key={photo.id} className="relative aspect-square rounded-lg overflow-hidden group border border-slate-800">
                                        <img src={photo.url} className="w-full h-full object-cover" alt="" />
                                        <button
                                            type="button"
                                            onClick={() => removeLocalPhoto(photo.id)}
                                            className="absolute inset-0 bg-red-600/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                                <label className="aspect-square rounded-lg border-2 border-dashed border-slate-700 hover:border-blue-500/50 transition-colors flex flex-col items-center justify-center cursor-pointer bg-slate-950/50 hover:bg-slate-900/50 group">
                                    <span className="text-2xl text-slate-500 group-hover:text-blue-400 opacity-60">+</span>
                                    <span className="text-[8px] font-bold text-slate-600 group-hover:text-blue-400 uppercase tracking-tighter">Add</span>
                                    <input type="file" multiple accept="image/*" onChange={handleFileUpload} className="hidden" />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3 flex-shrink-0">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex-1 px-4 py-3 bg-slate-800 text-slate-300 rounded-xl font-bold hover:bg-slate-700 transition-all active:scale-[0.98]"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-[2] px-4 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98]"
                        >
                            {editingPin ? 'Update Memory' : 'Save Memory'}
                        </button>
                    </div>
                </form>

                {/* Discard Confirmation Overlay */}
                {showDiscardConfirm && (
                    <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-8 z-10 animate-in fade-in duration-200">
                        <div className="text-center space-y-6">
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-white">Unsaved Changes</h3>
                                <p className="text-slate-400 text-sm">
                                    You have made changes to this memory. Are you sure you want to discard them?
                                </p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <button
                                    onClick={closeModal}
                                    className="w-full py-3 bg-red-600/20 border border-red-500/50 text-red-500 rounded-xl font-bold hover:bg-red-600 hover:text-white transition-all"
                                >
                                    Discard Changes
                                </button>
                                <button
                                    onClick={() => setShowDiscardConfirm(false)}
                                    className="w-full py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-all"
                                >
                                    Keep Editing
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
