import * as THREE from 'three';

/**
 * Converts a 3D point on a sphere to Latitude and Longitude
 * Assuming the sphere is at origin (0,0,0)
 */
export function vector3ToLatLng(point: THREE.Vector3): { lat: number, lng: number } {
    const normalizedPoint = point.clone().normalize();

    // Calculate latitude (-90 to 90 degrees)
    const latRad = Math.asin(normalizedPoint.y);

    // Calculate longitude (-180 to 180 degrees)
    // atan2(x, z) gives the angle in the XZ plane.
    const lngRad = Math.atan2(normalizedPoint.x, normalizedPoint.z);

    const lat = latRad * (180 / Math.PI);
    const lng = lngRad * (180 / Math.PI);

    return { lat, lng };
}

/**
 * Converts Latitude and Longitude to a 3D position vector on a sphere
 */
export function latLngToVector3(lat: number, lng: number, radius: number = 10): THREE.Vector3 {
    const latRad = lat * (Math.PI / 180);
    const lngRad = lng * (Math.PI / 180);

    // Three.js Coordinate System: Y is up
    const y = radius * Math.sin(latRad);
    const radiusXZ = radius * Math.cos(latRad);
    const x = radiusXZ * Math.sin(lngRad);
    const z = radiusXZ * Math.cos(lngRad);

    return new THREE.Vector3(x, y, z);
}
