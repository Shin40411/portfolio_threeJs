import { useRef, useEffect, useState, useCallback } from 'react'
import { useScroll, useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame, type ThreeEvent } from '@react-three/fiber'

useGLTF.preload('/worker5_0.glb')

export function OfficeWorker({ position = [0, 0, 0], isMobile, isTablet, isSmallLaptop, onInteractionChange }: { position?: [number, number, number], isMobile: boolean, isTablet: boolean, isSmallLaptop: boolean, onInteractionChange?: (enabled: boolean) => void }) {
    const { scene, animations } = useGLTF('/worker5_0.glb') as unknown as { scene: THREE.Group, animations: THREE.AnimationClip[] }
    const { actions } = useAnimations(animations, scene)
    const ref = useRef<THREE.Group>(null!)
    const scroll = useScroll()
    const [currentAction, setCurrentAction] = useState<string>('Typing')
    const [isWaving, setIsWaving] = useState(false)
    const [canInteract, setCanInteract] = useState(true)
    const [hasPlayedInitialWave, setHasPlayedInitialWave] = useState(false)
    const [showTooltip, setShowTooltip] = useState(false)

    const scaleValue = isMobile ? 1.2 : (isTablet ? 1.4 : (isSmallLaptop ? 1.3 : 0.8))

    useEffect(() => {
        if (actions['Typing']) {
            actions['Typing'].reset().fadeIn(0.5).play()
        }
        if (actions['StandUp']) {
            /* eslint-disable react-hooks/immutability */
            actions['StandUp'].setLoop(THREE.LoopOnce, 1)
            actions['StandUp'].clampWhenFinished = true
            /* eslint-enable react-hooks/immutability */
        }
        if (actions['Waving']) {
            /* eslint-disable react-hooks/immutability */
            actions['Waving'].setLoop(THREE.LoopOnce, 1)
            actions['Waving'].clampWhenFinished = true
            /* eslint-enable react-hooks/immutability */
        }
        if (actions['snore']) {
            actions['snore'].reset().fadeIn(0.5).play()
        }
        return () => {
            actions['Typing']?.fadeOut(0.5)
            actions['StandUp']?.fadeOut(0.5)
            actions['Waving']?.fadeOut(0.5)
            actions['snore']?.fadeOut(0.5)
        }
    }, [actions])

    useEffect(() => {
        if (!hasPlayedInitialWave && actions['Waving'] && actions['Typing']) {
            const timer = setTimeout(() => {
                setIsWaving(true)
                const typingAction = actions['Typing']
                const wavingAction = actions['Waving']

                if (typingAction && wavingAction) {
                    typingAction.fadeOut(0.3)
                    wavingAction.reset().fadeIn(0.3).play()

                    setTimeout(() => {
                        wavingAction.fadeOut(0.5)
                        typingAction.reset().fadeIn(0.5).play()
                        setIsWaving(false)
                        setHasPlayedInitialWave(true)
                    }, wavingAction.getClip().duration * 1000)
                }
            }, 1500)

            return () => clearTimeout(timer)
        }
    }, [actions, hasPlayedInitialWave])

    const handleClick = useCallback((event: ThreeEvent<MouseEvent>) => {
        event.stopPropagation()
        if (!canInteract || isWaving) return

        setIsWaving(true)
        const prevAction = actions[currentAction]
        const wavingAction = actions['Waving']

        if (prevAction && wavingAction) {
            prevAction.fadeOut(0.3)
            wavingAction.reset().fadeIn(0.3).play()

            setTimeout(() => {
                wavingAction.fadeOut(0.5)
                prevAction.reset().fadeIn(0.5).play()
                setIsWaving(false)
            }, wavingAction.getClip().duration * 1000)
        }
    }, [actions, currentAction, canInteract, isWaving])

    useFrame(() => {
        const offset = scroll.offset

        const shouldInteract = offset <= 0.25
        if (shouldInteract !== canInteract) {
            setCanInteract(shouldInteract)
            onInteractionChange?.(shouldInteract)
        }

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

        if (isWaving) return

        const targetAction = offset > 0.8 ? 'StandUp' : 'Typing'
        if (targetAction !== currentAction && actions[targetAction]) {
            const prevAction = actions[currentAction]
            const nextAction = actions[targetAction]
            prevAction?.fadeOut(0.5)
            nextAction?.reset().fadeIn(0.5).play()
            setCurrentAction(targetAction)
        }
    })

    return (
        <>
            <primitive
                ref={ref}
                object={scene}
                position={position}
                scale={[scaleValue, scaleValue, scaleValue]}
                onClick={handleClick}
                onPointerOver={(e: ThreeEvent<PointerEvent>) => {
                    if (canInteract) {
                        e.stopPropagation()
                        setShowTooltip(true)
                        const tooltip = document.getElementById('character-tooltip')
                        if (tooltip) {
                            tooltip.style.display = 'block'
                            tooltip.style.left = `${e.clientX + 15}px`
                            tooltip.style.top = `${e.clientY + 15}px`
                        }
                        document.body.style.cursor = 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 32 32\'><circle cx=\'16\' cy=\'16\' r=\'10\' fill=\'%2300E5FF\' opacity=\'0.4\'/><circle cx=\'16\' cy=\'16\' r=\'6\' fill=\'%2300E5FF\' opacity=\'0.8\'/><circle cx=\'16\' cy=\'16\' r=\'3\' fill=\'%23ffffff\'/></svg>") 16 16, pointer'
                    }
                }}
                onPointerOut={(e: ThreeEvent<PointerEvent>) => {
                    e.stopPropagation()
                    setShowTooltip(false)
                    const tooltip = document.getElementById('character-tooltip')
                    if (tooltip) {
                        tooltip.style.display = 'none'
                    }
                    document.body.style.cursor = 'auto'
                }}
                onPointerMove={(e: ThreeEvent<PointerEvent>) => {
                    if (canInteract && showTooltip) {
                        const tooltip = document.getElementById('character-tooltip')
                        if (tooltip) {
                            tooltip.style.left = `${e.clientX + 15}px`
                            tooltip.style.top = `${e.clientY + 15}px`
                        }
                    }
                }}
            />
        </>
    )
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
