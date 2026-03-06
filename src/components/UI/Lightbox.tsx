import { Photo } from '../../store/useGlobeStore';

interface LightboxProps {
    photo: Photo;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
    hasMultiple: boolean;
}

export function Lightbox({ photo, onClose, onPrev, onNext, hasMultiple }: LightboxProps) {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/95 animate-in fade-in duration-300">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 z-10 p-4 text-white hover:text-blue-400 transition-all bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-md border border-white/10"
            >
                <span className="text-xl">✕ Close</span>
            </button>

            {/* Navigation Buttons */}
            {hasMultiple && (
                <>
                    <button
                        onClick={onPrev}
                        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 p-6 text-white hover:text-blue-400 transition-all bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-md border border-white/10 active:scale-90"
                    >
                        <span className="text-3xl">←</span>
                    </button>
                    <button
                        onClick={onNext}
                        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-6 text-white hover:text-blue-400 transition-all bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-md border border-white/10 active:scale-90"
                    >
                        <span className="text-3xl">→</span>
                    </button>
                </>
            )}

            {/* Image Container */}
            <div className="relative w-full h-full flex items-center justify-center animate-in zoom-in-95 duration-500">
                <img
                    src={photo.url}
                    alt={photo.name}
                    className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
                />

                {/* Meta Information */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/10 text-center space-y-1 shadow-2xl max-w-[80vw]">
                    <h3 className="text-white font-bold tracking-tight">{photo.name}</h3>
                    <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">{photo.createdAt}</p>
                </div>
            </div>
        </div>
    );
}
