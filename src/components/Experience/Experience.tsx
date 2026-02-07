import { useRef } from 'react'
import { useScroll, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import { DynamicBackground } from './DynamicBackground'
import { Stars } from './Stars'
import { CharacterWrapper } from './OfficeWorker'
import { useFrame } from '@react-three/fiber'

export function Experience({ isMobile, isTablet, isSmallLaptop }: { isMobile: boolean, isTablet: boolean, isSmallLaptop: boolean }) {
    const scroll = useScroll()
    const sunRaysRef = useRef<THREE.Group>(null!)
    const cloudsRef = useRef<THREE.Group>(null!)
    const sunGroupRef = useRef<THREE.Group>(null!)
    const moonGroupRef = useRef<THREE.Group>(null!)
    const celestialGroupRef = useRef<THREE.Group>(null!)

    const isNonDesktop = isMobile || isTablet || isSmallLaptop

    // Slightly larger celestial elements for responsive
    const scale = isMobile ? 0.75 : (isTablet ? 0.9 : (isSmallLaptop ? 0.95 : 1))

    // Position celestial bodies in the top half for non-desktop, but closer to character
    const baseCelestialX = isMobile ? -1.8 : (isTablet ? -1.8 : (isSmallLaptop ? -2 : -2.5))
    const baseCelestialY = isMobile ? -2 : (isTablet ? -1.5 : (isSmallLaptop ? -1 : 1))

    // Lift character up slightly from the very bottom
    const baseCharacterX = isNonDesktop ? 0 : 2
    const baseCharacterY = isMobile ? -5.4 : (isTablet ? -4.8 : (isSmallLaptop ? -3.8 : -1))

    useFrame(() => {
        const offset = scroll.offset
        const tStart = 0.45, tEnd = 0.55
        let sunOpacity = 1, moonOpacity = 0
        if (offset >= tStart && offset <= tEnd) {
            const t = (offset - tStart) / (tEnd - tStart)
            sunOpacity = 1 - t; moonOpacity = t
        } else if (offset > tEnd) {
            sunOpacity = 0; moonOpacity = 1
        }

        [sunGroupRef, moonGroupRef].forEach((ref, i) => {
            const op = i === 0 ? sunOpacity : moonOpacity
            if (ref.current) {
                ref.current.traverse(c => {
                    if (c instanceof THREE.Mesh && c.material) {
                        const mat = c.material as THREE.MeshStandardMaterial
                        mat.opacity = op; mat.transparent = true
                    }
                })
                ref.current.visible = op > 0
            }
        })

        if (sunRaysRef.current) sunRaysRef.current.rotation.z += 0.005
        if (cloudsRef.current) {
            cloudsRef.current.traverse(c => {
                if (c instanceof THREE.Mesh && c.material) {
                    const mat = c.material as THREE.MeshStandardMaterial
                    mat.opacity = sunOpacity * 0.7
                    mat.transparent = true
                }
            })
            cloudsRef.current.visible = sunOpacity > 0.01

            if (offset < 0.5) {
                cloudsRef.current.children.forEach((c, i) => {
                    c.position.x += 0.002 * (i % 2 === 0 ? 1 : -1)
                    if (c.position.x > 6) c.position.x = -6
                    if (c.position.x < -6) c.position.x = 6
                })
            }
        }

        if (celestialGroupRef.current) {
            // End position adjustment - keep consistent on the left for non-desktop
            const endX = isNonDesktop ? baseCelestialX : 2.5
            const targetX = offset > 0.8 ? endX : baseCelestialX
            celestialGroupRef.current.position.x = THREE.MathUtils.lerp(celestialGroupRef.current.position.x, targetX, 0.05)
        }
    })

    const cloudsX = isNonDesktop ? baseCelestialX : 0
    const cloudsY = isNonDesktop ? baseCelestialY - 1.5 : 0
    const cloudOffsets = isNonDesktop
        ? [[-0.8, 0.4, 0.5, 0.6], [0.5, 0.6, 0.4, 0.7], [1.2, 0.2, 0.3, 0.5], [-0.4, -0.3, 0.6, 0.6]]
        : [[-3, 0.8, -1.2, 0.8], [1, 1.2, -1.0, 1], [4, 1.0, -1.4, 0.6], [-1, 1.1, -0.8, 0.9]]

    return (
        <>
            <DynamicBackground />
            <Environment preset="city" />
            <ContactShadows opacity={0.4} scale={10} blur={2} far={4.5} />
            <group ref={celestialGroupRef} position={[baseCelestialX, baseCelestialY, -2]} scale={scale}>
                <group ref={sunGroupRef}>
                    <mesh>
                        <sphereGeometry args={[0.6, 64, 64]} />
                        <meshStandardMaterial color="#FFA500" emissive="#FF4500" emissiveIntensity={3.5} roughness={0.1} metalness={0.0} toneMapped={false} />
                    </mesh>
                    <group ref={sunRaysRef}>
                        {Array.from({ length: 12 }).map((_, i) => {
                            const angle = (i / 12) * Math.PI * 2, d = 0.85
                            return (
                                <mesh key={i} position={[Math.cos(angle) * d, Math.sin(angle) * d, 0]} rotation={[0, 0, angle + Math.PI / 2]}>
                                    <coneGeometry args={[0.12, 0.5, 3]} />
                                    <meshStandardMaterial color="#FFD700" emissive="#FFA500" emissiveIntensity={2.5} toneMapped={false} />
                                </mesh>
                            )
                        })}
                    </group>
                </group>
                <group ref={moonGroupRef}>
                    <mesh>
                        <sphereGeometry args={[0.65, 64, 64]} />
                        <meshStandardMaterial color="#D3D3D3" emissive="#4a4a5e" emissiveIntensity={0.4} roughness={0.9} metalness={0.0} />
                    </mesh>
                    {[[0.3, 0.2, 0.5, 0.15], [-0.2, 0.4, 0.4, 0.12], [0.1, -0.3, 0.5, 0.18], [-0.4, -0.1, 0.4, 0.1], [0.2, -0.5, 0.3, 0.08], [-0.3, 0.5, 0.2, 0.14]].map((c, i) => (
                        <mesh key={i} position={[c[0], c[1], c[2]]}>
                            <sphereGeometry args={[c[3], 32, 32]} />
                            <meshStandardMaterial color="#808080" roughness={1.0} />
                        </mesh>
                    ))}
                </group>
            </group>
            <group ref={cloudsRef} position={[cloudsX, cloudsY, 0]}>
                {cloudOffsets.map((c, i) => (
                    <group key={i} position={[c[0], c[1], c[2]]} scale={c[3]}>
                        <mesh position={[0, 0, 0]}><sphereGeometry args={[0.3, 16, 16]} /><meshStandardMaterial color="#ffffff" transparent opacity={0.7} /></mesh>
                        <mesh position={[0.25, 0.1, 0]}><sphereGeometry args={[0.25, 16, 16]} /><meshStandardMaterial color="#ffffff" transparent opacity={0.7} /></mesh>
                        <mesh position={[-0.2, 0.05, 0]}><sphereGeometry args={[0.22, 16, 16]} /><meshStandardMaterial color="#ffffff" transparent opacity={0.7} /></mesh>
                        <mesh position={[0.1, -0.15, 0]}><sphereGeometry args={[0.2, 16, 16]} /><meshStandardMaterial color="#ffffff" transparent opacity={0.7} /></mesh>
                    </group>
                ))}
            </group>
            <Stars
                opacity={(scroll.offset > 0.45) ? (scroll.offset < 0.55 ? (scroll.offset - 0.45) / 0.1 : 1) : 0}
                position={[cloudsX, isNonDesktop ? baseCelestialY : 0, 0]}
            />
            <CharacterWrapper baseX={baseCharacterX} baseY={baseCharacterY} isMobile={isMobile} isTablet={isTablet} isSmallLaptop={isSmallLaptop} scroll={scroll} />
        </>
    )
}
