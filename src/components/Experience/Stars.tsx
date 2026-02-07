import { useMemo } from 'react'

export function Stars({ opacity = 1, position = [0, 0, 0] }: { opacity?: number, position?: [number, number, number] }) {
    /* eslint-disable react-hooks/purity */
    const starData = useMemo(() => Array.from({ length: 30 }).map(() => ({
        x: (Math.random() - 0.5) * 4, // Tighter range for clustering
        y: (Math.random() - 0.5) * 3, // Tighter range for clustering
        z: -Math.random() * 2 - 1,   // Closer to the background of the moon
        size: Math.random() * 0.02 + 0.015,
        intensity: Math.random() * 2 + 1
    })), [])
    /* eslint-enable react-hooks/purity */
    return (
        <group visible={opacity > 0.01} position={position}>
            {starData.map((star, i) => (
                <mesh key={i} position={[star.x, star.y, star.z]}>
                    <sphereGeometry args={[star.size, 8, 8]} />
                    <meshStandardMaterial
                        color="#FFFFFF"
                        emissive="#FFFFE0"
                        emissiveIntensity={star.intensity * opacity}
                        toneMapped={false}
                        transparent
                        opacity={opacity}
                    />
                </mesh>
            ))}
        </group>
    )
}
