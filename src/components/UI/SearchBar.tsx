import { useGlobeStore } from '../../store/useGlobeStore';

export function SearchBar() {
    const searchTerm = useGlobeStore((state) => state.searchTerm);
    const setSearchTerm = useGlobeStore((state) => state.setSearchTerm);
    const activePinId = useGlobeStore((state) => state.activePinId);
    const setActivePin = useGlobeStore((state) => state.setActivePin);
    const pins = useGlobeStore((state) => state.pins);

    const activePin = pins.find(p => p.id === activePinId);

    return (
        <div className="absolute top-6 right-6 z-20 pointer-events-auto flex flex-col items-end gap-3">
            <input
                type="text"
                placeholder="Search pins..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 bg-slate-900/80 border border-slate-700/80 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-md w-72 shadow-2xl transition-all"
            />

            {activePinId && activePin && (
                <div className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-5 backdrop-blur-md w-72 shadow-2xl origin-top transition-all">
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-white text-lg tracking-tight">
                            {activePin.title || 'Untitled Pin'}
                        </h3>
                        <button onClick={() => setActivePin(null)} className="text-slate-400 hover:text-white transition-colors bg-slate-800 rounded-full w-6 h-6 flex items-center justify-center text-xs">✕</button>
                    </div>

                    <div className="space-y-4 text-sm">
                        <div className="text-blue-300 font-mono text-xs p-2 bg-slate-950/50 rounded-lg">
                            LAT: {activePin.latitude.toFixed(4)}<br />
                            LON: {activePin.longitude.toFixed(4)}
                        </div>

                        {activePin.date && (
                            <p className="text-slate-400 text-xs mt-1">
                                Added: {new Date(activePin.date).toLocaleDateString()}
                            </p>
                        )}

                        <p className="text-slate-300 leading-relaxed">
                            {activePin.notes || 'No description provided.'}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
