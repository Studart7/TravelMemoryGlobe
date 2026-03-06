import { useProgress, Html } from '@react-three/drei';
import { useEffect, useState } from 'react';

export function LoadingScreen() {
    const { progress, active } = useProgress();
    const [shouldRender, setShouldRender] = useState(true);
    const [isLeaving, setIsLeaving] = useState(false);

    useEffect(() => {
        if (!active && progress === 100) {
            setIsLeaving(true);
            const timer = setTimeout(() => {
                setShouldRender(false);
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [active, progress]);

    if (!shouldRender) return null;

    return (
        <Html center portal={undefined}>
            <div
                className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 transition-all duration-700 ease-in-out ${isLeaving ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100'
                    }`}
                style={{ width: '100vw', height: '100vh' }}
            >
                {/* Background Glow */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
                </div>

                <div className="relative flex flex-col items-center space-y-8 max-w-xs w-full px-6">
                    {/* Icon / Brand */}
                    <div className="relative w-24 h-24 mb-4">
                        <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse" />
                        <div className="relative w-full h-full border-2 border-blue-500/30 rounded-full flex items-center justify-center text-4xl animate-[spin_10s_linear_infinite]">
                            🌍
                        </div>
                    </div>

                    <div className="text-center space-y-2">
                        <h1 className="text-2xl font-black text-white tracking-tighter uppercase italic">
                            Travel <span className="text-blue-500">Globe</span>
                        </h1>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                            Loading Physical Assets
                        </p>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="w-full space-y-3">
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-[1px]">
                            <div
                                className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(37,99,235,0.5)]"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <div className="flex justify-between items-center px-1">
                            <span className="text-[10px] font-mono font-bold text-blue-500">
                                {Math.round(progress)}%
                            </span>
                            <span className="text-[10px] font-mono font-bold text-slate-600 animate-pulse">
                                Initializing...
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer Decor */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 opacity-30">
                    <div className="h-px w-8 bg-gradient-to-r from-transparent to-slate-500" />
                    <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Memories Await</span>
                    <div className="h-px w-8 bg-gradient-to-l from-transparent to-slate-500" />
                </div>
            </div>
        </Html>
    );
}
