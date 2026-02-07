import { useRef, useEffect, useState } from 'react'
import { useScroll, useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

useGLTF.preload('/workder4_0.glb')

export function OfficeWorker({ position = [0, 0, 0], isMobile, isTablet, isSmallLaptop }: { position?: [number, number, number], isMobile: boolean, isTablet: boolean, isSmallLaptop: boolean }) {
    const { scene, animations } = useGLTF('/workder4_0.glb') as unknown as { scene: THREE.Group, animations: THREE.AnimationClip[] }
    const { actions } = useAnimations(animations, scene)
    const ref = useRef<THREE.Group>(null!)
    const scroll = useScroll()
    const [currentAction, setCurrentAction] = useState<string>('Typing')

    const scaleValue = isMobile ? 1.2 : (isTablet ? 1.4 : (isSmallLaptop ? 1.5 : 0.8))

    useEffect(() => {
        if (actions['snore']) {
            actions['snore'].reset().fadeIn(0.5).play()
        }
        if (actions['Typing']) {
            actions['Typing'].reset().fadeIn(0.5).play()
        }
        if (actions['StandUp']) {
            /* eslint-disable react-hooks/immutability */
            actions['StandUp'].setLoop(THREE.LoopOnce, 1)
            actions['StandUp'].clampWhenFinished = true
            /* eslint-enable react-hooks/immutability */
        }
        return () => {
            actions['snore']?.fadeOut(0.5)
            actions['Typing']?.fadeOut(0.5)
            actions['StandUp']?.fadeOut(0.5)
        }
    }, [actions])

    useFrame(() => {
        const offset = scroll.offset
        if (ref.current) {
            let targetRog = offset * Math.PI * 2

            if (offset > 0.32 && offset < 0.8) {
                targetRog = 0.32 * Math.PI * 2
            } else if (offset >= 0.8) {
                const t = (offset - 0.8) / 0.2
                const smoothOffset = 0.32 + t * (1 - 0.32)
                targetRog = smoothOffset * Math.PI * 2
            }

            ref.current.rotation.y = targetRog
        }

        const targetAction = offset > 0.8 ? 'StandUp' : 'Typing'
        if (targetAction !== currentAction && actions[targetAction]) {
            const prevAction = actions[currentAction]
            const nextAction = actions[targetAction]
            prevAction?.fadeOut(0.5)
            nextAction?.reset().fadeIn(0.5).play()
            setCurrentAction(targetAction)
        }
    })

    return <primitive ref={ref} object={scene} position={position} scale={[scaleValue, scaleValue, scaleValue]} />
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CharacterWrapper({ baseX, baseY, isMobile, isTablet, isSmallLaptop, scroll }: { baseX: number, baseY: number, isMobile: boolean, isTablet: boolean, isSmallLaptop: boolean, scroll: any }) {
    const groupRef = useRef<THREE.Group>(null!)
    const isNonDesktop = isMobile || isTablet || isSmallLaptop

    useFrame(() => {
        const offset = scroll.offset
        const endX = isNonDesktop ? 0 : (isMobile ? -0.8 : (isTablet ? -1.2 : -1.3))
        const targetX = offset > 0.8 ? endX : baseX
        if (groupRef.current) {
            groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05)
            groupRef.current.position.y = baseY
        }
    })
    return (
        <group ref={groupRef} position={[baseX, baseY, 0]}>
            <OfficeWorker isMobile={isMobile} isTablet={isTablet} isSmallLaptop={isSmallLaptop} />
        </group>
    )
}
