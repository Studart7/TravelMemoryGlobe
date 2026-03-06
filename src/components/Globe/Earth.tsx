import { useRef } from 'react';
import { Group, Mesh } from 'three';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { vector3ToLatLng } from '../../three/utils/math';
import { useGlobeStore } from '../../store/useGlobeStore';
import { PinMarkers } from '../PinMarker';
import { Glow } from './Glow.tsx';

const EARTH_AXIAL_TILT = -23.4 * (Math.PI / 180);

export function Earth() {
    const groupRef = useRef<Group>(null);
    const cloudsRef = useRef<Mesh>(null);

    const openModal = useGlobeStore((state) => state.openModal);
    const isAddMode = useGlobeStore((state) => state.isAddMode);
    const pointerDownPos = useRef<THREE.Vector2>(new THREE.Vector2());

    const [colorMap, bumpMap, specularMap, cloudsMap, cloudsAlphaMap] = useTexture([
        'materials/8081_earthmap10k.jpg',
        'materials/8081_earthbump10k.jpg',
        'materials/8081_earthlights10k.jpg',
        'materials/8081_earthhiresclouds4K.jpg',
        'materials/earthcloudmaptrans.jpg',
    ]);

    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.0005;
        }
        if (cloudsRef.current) {
            cloudsRef.current.rotation.y += 0.0003;
        }
    });

    const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
        if (!isAddMode || event.button !== 0) return;
        pointerDownPos.current.set(event.clientX, event.clientY);
    };

    const handlePointerUp = (event: ThreeEvent<PointerEvent>) => {
        if (!isAddMode || event.button !== 0) return;

        // Check if the pointer moved significantly (drag)
        const moveDist = Math.sqrt(
            Math.pow(event.clientX - pointerDownPos.current.x, 2) +
            Math.pow(event.clientY - pointerDownPos.current.y, 2)
        );

        if (moveDist > 5) return; // Threshold for dragging

        event.stopPropagation();

        // We use worldToLocal to properly get the position on the rotating sphere
        const localPoint = event.object.worldToLocal(event.point.clone());
        const { lat, lng } = vector3ToLatLng(localPoint);

        openModal({ lat, lng });
    };

    return (
        <group ref={groupRef} rotation-x={EARTH_AXIAL_TILT}>
            {/* Base Earth */}
            <mesh
                name="earth"
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
            >
                <sphereGeometry args={[10, 64, 64]} />
                <meshPhongMaterial
                    map={colorMap}
                    bumpMap={bumpMap}
                    bumpScale={0.2}
                    specularMap={specularMap}
                />
            </mesh>

            {/* City Lights Layer (Additive) */}
            <mesh name="lights" scale={1.001}>
                <sphereGeometry args={[10, 64, 64]} />
                <meshBasicMaterial
                    map={specularMap}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Clouds Layer */}
            <mesh ref={cloudsRef} name="clouds" scale={1.009}>
                <sphereGeometry args={[10, 64, 64]} />
                <meshStandardMaterial
                    map={cloudsMap}
                    transparent={true}
                    opacity={0.3}
                    alphaMap={cloudsAlphaMap}
                />
            </mesh>

            {/* Fresnel Atmosphere Glow */}
            <Glow />

            {/* Pins bound to the Earth's rotation */}
            <PinMarkers />
        </group>
    );
}
