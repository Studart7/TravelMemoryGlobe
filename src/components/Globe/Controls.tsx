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

    useEffect(() => {
        if (!controlsRef.current) return;

        if (activePinId) {
            const activePinObject = scene.getObjectByName(`pin-${activePinId}`);
            if (activePinObject) {
                const pinWorldPos = new THREE.Vector3();
                activePinObject.getWorldPosition(pinWorldPos);

                const direction = pinWorldPos.clone().normalize();
                const targetCameraPos = direction.multiplyScalar(20);

                gsap.to(camera.position, {
                    x: targetCameraPos.x,
                    y: targetCameraPos.y,
                    z: targetCameraPos.z,
                    duration: 1.5,
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
