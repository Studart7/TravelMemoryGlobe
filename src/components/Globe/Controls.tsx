import { useEffect, useRef } from 'react';
import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useGlobeStore } from '../../store/useGlobeStore';
import * as THREE from 'three';
import gsap from 'gsap';

export function Controls() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const controlsRef = useRef<any>(null);
    const { camera, scene } = useThree();
    const activePinId = useGlobeStore((state) => state.activePinId);
    const focusSource = useGlobeStore((state) => state.focusSource);

    useEffect(() => {
        if (!controlsRef.current) return;

        if (activePinId) {
            const activePinObject = scene.getObjectByName(`pin-${activePinId}`);
            if (activePinObject) {
                const pinWorldPos = new THREE.Vector3();
                activePinObject.getWorldPosition(pinWorldPos);

                const direction = pinWorldPos.clone().normalize();

                // Dynamic distance based on focusSource
                // 'click' | 'create' -> closer (18)
                // 'search' | 'list' -> contextual (26)
                const distance = (focusSource === 'search' || focusSource === 'list') ? 26 : 18;
                const targetCameraPos = direction.multiplyScalar(distance);

                gsap.to(camera.position, {
                    x: targetCameraPos.x,
                    y: targetCameraPos.y,
                    z: targetCameraPos.z,
                    duration: focusSource === 'search' ? 2.0 : 1.5,
                    ease: "power3.inOut"
                });

                gsap.to(controlsRef.current.target, {
                    x: 0,
                    y: 0,
                    z: 0,
                    duration: 1.5,
                    ease: "power3.inOut"
                });
            }
        } else {
            const dir = camera.position.clone().normalize();
            const backPos = dir.multiplyScalar(25);

            gsap.to(camera.position, {
                x: backPos.x,
                y: backPos.y,
                z: backPos.z,
                duration: 1.2,
                ease: "power2.out"
            });
        }
    }, [activePinId, camera, scene]);

    return (
        <OrbitControls
            ref={controlsRef}
            enablePan={false}
            enableZoom={true}
            minDistance={12}
            maxDistance={40}
            rotateSpeed={0.6}
            zoomSpeed={0.8}
            makeDefault
        />
    );
}
