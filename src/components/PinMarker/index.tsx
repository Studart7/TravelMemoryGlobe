import { useGlobeStore } from '../../store/useGlobeStore';
import { latLngToVector3 } from '../../three/utils/math';

export function PinMarkers() {
    const pins = useGlobeStore((state) => state.pins);
    const activePinId = useGlobeStore((state) => state.activePinId);
    const setActivePin = useGlobeStore((state) => state.setActivePin);
    const searchTerm = useGlobeStore((state) => state.searchTerm);

    return (
        <group>
            {pins.map((pin) => {
                const position = latLngToVector3(pin.latitude, pin.longitude, 10.25);
                const isActive = pin.id === activePinId;

                const isMatch = searchTerm
                    ? (pin.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        pin.notes?.toLowerCase().includes(searchTerm.toLowerCase()))
                    : true;

                const isHighlighted = isMatch && searchTerm.length > 0;
                const scaleObj = isHighlighted ? 2.5 : 1.0;

                return (
                    <mesh
                        key={pin.id}
                        name={`pin-${pin.id}`}
                        position={position}
                        scale={[scaleObj, scaleObj, scaleObj]}
                        onClick={(e) => {
                            e.stopPropagation();
                            setActivePin(isActive ? null : pin.id);
                        }}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                        }}
                        onPointerUp={(e) => {
                            e.stopPropagation();
                        }}
                        onUpdate={(self) => {
                            self.lookAt(0, 0, 0);
                            self.rotateX(Math.PI / 2);
                        }}
                    >
                        <coneGeometry args={[0.15, 0.5, 16]} />
                        <meshStandardMaterial
                            color={isActive ? "#f59e0b" : "#ef4444"}
                            emissive={isActive ? "#f59e0b" : (isHighlighted ? "#ccff00" : "#ef4444")}
                            emissiveIntensity={isActive ? 0.8 : (isHighlighted ? 0.8 : 0.2)}
                            roughness={0.2}
                            metalness={0.8}
                        />
                    </mesh>
                );
            })}
        </group>
    );
}
