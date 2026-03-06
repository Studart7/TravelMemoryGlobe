import { Photo } from '../../store/useGlobeStore';

interface PhotoGridProps {
    photos: Photo[];
    onClose: () => void;
    onPhotoClick: (index: number) => void;
}

export function PhotoGrid({ photos, onClose, onPhotoClick }: PhotoGridProps) {
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300">
            <div className="bg-slate-900 w-full max-w-5xl h-[90vh] rounded-3xl border border-slate-700/50 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/40">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold text-white tracking-tight">Gallery</h2>
                        <p className="text-slate-400 text-sm font-medium">{photos.length} travel memories</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-3 text-slate-400 hover:text-white transition-colors bg-slate-800/50 hover:bg-slate-700/50 rounded-2xl"
                    >
                        ✕ Close
                    </button>
                </div>

                {/* Grid Area */}
                <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {photos.map((photo, index) => (
                            <div
                                key={photo.id}
                                onClick={() => onPhotoClick(index)}
                                className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-800 cursor-pointer border border-slate-700/30 hover:border-blue-500/50 transition-all hover:scale-[1.02] shadow-xl"
                            >
                                <img
                                    src={photo.url}
                                    alt={photo.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    <p className="text-white text-xs font-bold truncate">{photo.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
