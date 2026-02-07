import { useRef } from 'react'
import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function DynamicBackground() {
    const scroll = useScroll()
    const colorRef = useRef<THREE.Color>(null!)
    const workColor = useRef(new THREE.Color())
    const colors = [
        new THREE.Color('#87CEEB'),
        new THREE.Color('#F2EBE3'),
        new THREE.Color('#483D8B'),
        new THREE.Color('#191970')
    ]

    useFrame(() => {
        const offset = scroll.offset
        let c1 = colors[0], c2 = colors[1], mix = 0
        if (offset < 0.33) { mix = offset / 0.33 }
        else if (offset < 0.66) { c1 = colors[1]; c2 = colors[2]; mix = (offset - 0.33) / 0.33 }
        else { c1 = colors[2]; c2 = colors[3]; mix = (offset - 0.66) / 0.34 }
        workColor.current.lerpColors(c1, c2, Math.min(Math.max(mix, 0), 1))
        if (colorRef.current) colorRef.current.set(workColor.current)
    })
    return <color ref={colorRef} attach="background" args={['#F2EBE3']} />
}
