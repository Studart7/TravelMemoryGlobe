import { useState } from 'react';
import { Photo } from '../../store/useGlobeStore';

interface PhotoStackProps {
    photos: Photo[];
    onExpand: () => void;
    onPhotoClick: (index: number) => void;
}

export function PhotoStack({ photos, onExpand, onPhotoClick }: PhotoStackProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (photos.length === 0) {
        return (
            <div className="aspect-[4/3] bg-slate-950/50 rounded-2xl border border-slate-800/50 flex flex-col items-center justify-center text-slate-600 gap-2 group transition-colors hover:border-blue-500/30">
                <span className="text-4xl grayscale group-hover:grayscale-0 transition-all duration-500">📸</span>
                <p className="text-xs font-medium tracking-wide text-slate-500">No photos added yet</p>
            </div>
        );
    }

    const nextPhoto = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % photos.length);
    };

    const prevPhoto = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
    };

    // Calculate which photos to show in the stack (max 3)
    const getVisibleIndices = () => {
        if (photos.length === 1) return [currentIndex];
        if (photos.length === 2) return [currentIndex, (currentIndex + 1) % 2];
        return [
            (currentIndex - 1 + photos.length) % photos.length,
            currentIndex,
            (currentIndex + 1) % photos.length
        ];
    };

    const visibleIndices = getVisibleIndices();

    return (
        <div className="relative aspect-[4/3] w-full flex items-center justify-center pt-8 pb-4 group/stack">
            {/* Stack Base / Fan Effect */}
            <div className="relative w-[70%] h-full">
                {visibleIndices.map((photoIdx, i) => {
                    const isCenter = photoIdx === currentIndex;
                    const isPrev = photos.length > 2 && i === 0;
                    const isNext = photos.length > 2 ? i === 2 : i === 1;

                    let transform = 'translate(-50%, -50%) scale(0.85)';
                    let zIndex = 10;
                    let opacity = 0.4;
                    let rotate = '0deg';

                    if (isCenter) {
                        transform = 'translate(-50%, -50%) scale(1)';
                        zIndex = 30;
                        opacity = 1;
                        rotate = '0deg';
                    } else if (isPrev) {
                        rotate = '-10deg';
                        zIndex = 20;
                        opacity = 0.6;
                    } else if (isNext) {
                        rotate = '10deg';
                        zIndex = 20;
                        opacity = 0.6;
                    }

                    return (
                        <div
                            key={photos[photoIdx].id}
                            onClick={() => isCenter ? onPhotoClick(photoIdx) : setCurrentIndex(photoIdx)}
                            className="absolute top-1/2 left-1/2 w-full h-full transition-all duration-500 ease-out cursor-pointer"
                            style={{
                                transform: `${transform} rotate(${rotate})`,
                                zIndex,
                                opacity,
                                left: isCenter ? '50%' : (isPrev ? '50%' : '50%'),
                                marginLeft: isPrev ? '-40px' : (isNext ? '40px' : '0')
                            }}
                        >
                            <div className="w-full h-full rounded-2xl overflow-hidden border-2 border-slate-700/50 shadow-2xl bg-slate-800">
                                <img
                                    src={photos[photoIdx].url}
                                    alt={photos[photoIdx].name}
                                    className="w-full h-full object-cover"
                                />
                                {isCenter && (
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/stack:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                        <p className="text-white text-[10px] font-medium truncate w-full">{photos[photoIdx].name}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Navigation Controls */}
            {photos.length > 1 && (
                <>
                    <button
                        onClick={prevPhoto}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-40 p-2 bg-slate-900/80 border border-slate-700/50 rounded-full text-white opacity-0 group-hover/stack:opacity-100 transition-all hover:bg-blue-600 -translate-x-2 group-hover/stack:translate-x-0"
                    >
                        ←
                    </button>
                    <button
                        onClick={nextPhoto}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-40 p-2 bg-slate-900/80 border border-slate-700/50 rounded-full text-white opacity-0 group-hover/stack:opacity-100 transition-all hover:bg-blue-600 translate-x-2 group-hover/stack:translate-x-0"
                    >
                        →
                    </button>
                </>
            )}

            {/* Expand Button */}
            <button
                onClick={onExpand}
                className="absolute -bottom-2 right-0 z-40 px-3 py-1 bg-slate-800/80 backdrop-blur-md border border-slate-700/50 rounded-lg text-[10px] font-bold text-blue-400 hover:text-white hover:bg-blue-600 transition-all shadow-lg"
            >
                VIEW FULL GALLERY
            </button>
        </div>
    );
}
