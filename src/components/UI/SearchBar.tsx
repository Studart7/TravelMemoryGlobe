import { useGlobeStore } from '../../store/useGlobeStore';

export function SearchBar() {
    const searchTerm = useGlobeStore((state) => state.searchTerm);
    const setSearchTerm = useGlobeStore((state) => state.setSearchTerm);
    const setActivePin = useGlobeStore((state) => state.setActivePin);
    const isAddMode = useGlobeStore((state) => state.isAddMode);
    const setIsAddMode = useGlobeStore((state) => state.setIsAddMode);
    const pins = useGlobeStore((state) => state.pins);

    const filteredPins = searchTerm
        ? pins.filter(p =>
            p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.notes?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    return (
        <div className="fixed top-6 left-6 right-6 md:left-auto md:right-6 z-20 pointer-events-auto flex flex-col items-end gap-3 md:w-auto">
            <div className="flex gap-2 w-full md:w-auto">
                <button
                    onClick={() => setIsAddMode(!isAddMode)}
                    className={`px-4 py-2.5 rounded-xl border backdrop-blur-md shadow-2xl transition-all font-bold flex items-center justify-center gap-2 flex-1 md:flex-initial truncate min-w-[120px] ${isAddMode
                        ? 'bg-blue-600 border-blue-400 text-white'
                        : 'bg-slate-900/80 border-slate-700/80 text-slate-300 hover:bg-slate-800'
                        }`}
                >
                    {isAddMode ? (
                        <>
                            <span className="w-2 h-2 bg-white rounded-full animate-pulse flex-shrink-0" />
                            <span className="truncate">Add Mode</span>
                        </>
                    ) : (
                        <>
                            <span className="text-xl leading-none flex-shrink-0">+</span>
                            <span className="truncate">Add Pin</span>
                        </>
                    )}
                </button>
                <div className="relative flex-1 md:flex-initial">
                    <input
                        type="text"
                        placeholder="Search pins..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-64 px-4 py-2.5 bg-slate-900/80 border border-slate-700/80 rounded-xl text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-md shadow-2xl transition-all font-medium"
                    />

                    {searchTerm && filteredPins.length > 0 && (
                        <div className="absolute top-full mt-2 right-0 left-0 md:left-auto md:w-80 bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                            {filteredPins.map(p => (
                                <button
                                    key={p.id}
                                    onClick={() => {
                                        setActivePin(p.id, 'search');
                                        setSearchTerm('');
                                    }}
                                    className="w-full p-4 text-left hover:bg-white/10 transition-colors border-b border-slate-800/50 last:border-0 active:bg-blue-600/20"
                                >
                                    <p className="text-sm font-bold text-white truncate">{p.location}</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{p.dateDisplay}</p>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
