import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Earth } from './Earth';
import { Controls } from './Controls';

export function GlobeScene() {
    return (
        <div className="w-full h-full bg-slate-950">
            <Canvas camera={{ position: [0, 0, 25], fov: 45 }}>
                <ambientLight intensity={1.2} />
                <directionalLight position={[15, 15, 10]} intensity={2.5} />
                <directionalLight position={[-15, -15, -10]} intensity={0.5} />

                <Suspense fallback={null}>
                    <Earth />
                </Suspense>

                <Controls />
            </Canvas>
        </div>
    );
}
