import { useGlobeStore } from '../../store/useGlobeStore';

export function PinSidebar() {
    const isSidebarOpen = useGlobeStore((state) => state.isSidebarOpen);
    const setIsSidebarOpen = useGlobeStore((state) => state.setIsSidebarOpen);
    const sortOrder = useGlobeStore((state) => state.sortOrder);
    const setSortOrder = useGlobeStore((state) => state.setSortOrder);
    const pins = useGlobeStore((state) => state.pins);
    const activePinId = useGlobeStore((state) => state.activePinId);
    const setActivePin = useGlobeStore((state) => state.setActivePin);

    // Sorting logic
    const sortedPins = [...pins].sort((a, b) => {
        if (sortOrder === 'name') {
            return a.location.localeCompare(b.location);
        } else {
            // Sort by memoryDate descending (newest first)
            return new Date(b.memoryDate).getTime() - new Date(a.memoryDate).getTime();
        }
    });

    return (
        <div
            className={`fixed top-0 left-0 h-full z-30 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] flex ${isSidebarOpen ? 'w-84' : 'w-0'
                }`}
        >
            {/* Sidebar Content */}
            <div className="h-full w-full bg-slate-900/95 backdrop-blur-xl border-r border-slate-800/50 flex flex-col overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-slate-800/50 space-y-4 bg-slate-900/50">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                            <span className="text-blue-500">📍</span> My Memories
                        </h2>
                        <span className="px-2 py-1 bg-slate-800/80 rounded-lg text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-slate-700/50">
                            {pins.length} total
                        </span>
                    </div>

                    {/* Sort Controls */}
                    <div className="flex bg-slate-950/50 p-1 rounded-xl border border-slate-800/50">
                        <button
                            onClick={() => setSortOrder('date')}
                            className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${sortOrder === 'date'
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'text-slate-500 hover:text-slate-300'
                                }`}
                        >
                            Recent
                        </button>
                        <button
                            onClick={() => setSortOrder('name')}
                            className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${sortOrder === 'name'
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'text-slate-500 hover:text-slate-300'
                                }`}
                        >
                            A-Z
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
                    {sortedPins.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-500 p-6 text-center space-y-3">
                            <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center text-3xl opacity-50 animate-pulse">🌍</div>
                            <p className="text-sm font-medium">No memories yet.<br /><span className="text-xs opacity-60">Start exploring and pin your first spot!</span></p>
                        </div>
                    ) : (
                        sortedPins.map((pin) => (
                            <button
                                key={pin.id}
                                onClick={() => setActivePin(pin.id, 'list')}
                                className={`w-full p-4 rounded-xl text-left transition-all group relative overflow-hidden active:scale-[0.98] ${activePinId === pin.id
                                    ? 'bg-blue-600/20 border border-blue-500/50 shadow-lg shadow-blue-900/10'
                                    : 'bg-slate-800/30 border border-transparent hover:bg-slate-800/60 hover:border-slate-700'
                                    }`}
                            >
                                <div className="relative z-10 flex flex-col gap-1">
                                    <span className={`text-sm font-bold tracking-tight transition-colors ${activePinId === pin.id ? 'text-blue-300' : 'text-slate-200 group-hover:text-white'
                                        }`}>
                                        {pin.location || 'Unknown Location'}
                                    </span>
                                    <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500">
                                        <span className="bg-slate-900/50 px-1.5 py-0.5 rounded border border-slate-700/50">
                                            {pin.dateDisplay || new Date(pin.memoryDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                                {activePinId === pin.id && (
                                    <div className="absolute left-0 top-0 h-full w-1 bg-blue-500" />
                                )}
                            </button>
                        ))
                    )}
                </div>
            </div>

            {/* Optimized Toggle Button Container - Larger & More Accessible */}
            <div className="absolute top-1/2 -right-10 -translate-y-1/2 flex items-center pointer-events-none group/toggle">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="w-14 h-14 bg-slate-900 border-2 border-slate-700 text-white rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.6)] transition-all hover:bg-blue-600 hover:border-blue-400 pointer-events-auto active:scale-75 relative group"
                >
                    <span className={`text-2xl font-black transition-transform duration-500 ${isSidebarOpen ? 'rotate-180' : ''}`}>
                        ➜
                    </span>

                    {/* Badge */}
                    {!isSidebarOpen && pins.length > 0 && (
                        <div className="absolute -top-1 -right-1 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-[11px] font-black border-2 border-slate-900 shadow-lg animate-bounce">
                            {pins.length}
                        </div>
                    )}
                </button>
            </div>
        </div>
    );
}
