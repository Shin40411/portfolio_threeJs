import { Canvas, useFrame } from '@react-three/fiber'
import { ScrollControls, Scroll, useScroll, ContactShadows, Environment, useGLTF, useAnimations } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Overlay } from './components/Overlay'
import { Navbar } from './components/Navbar'
import * as THREE from 'three'
import { useRef, useEffect, useMemo, useState } from 'react'

useGLTF.preload('/office_worker_2_-_animated.glb')

function OfficeWorker({ position = [2, -1, 0] }: { position?: [number, number, number] }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { scene, animations } = useGLTF('/office_worker_2_-_animated.glb') as any
  const { actions } = useAnimations(animations, scene)
  const ref = useRef<THREE.Group>(null!)
  const scroll = useScroll()

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstActionName = Object.keys(actions)[0]
      actions[firstActionName]?.play()
    }
  }, [actions])

  useFrame(() => {
    const offset = scroll.offset
    if (ref.current) {
      ref.current.rotation.y = offset * Math.PI * 2
    }
  })

  return <primitive ref={ref} object={scene} position={position} scale={[1, 1, 1]} />
}

function DynamicBackground() {
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

    let c1 = colors[0]
    let c2 = colors[1]
    let mix = 0

    if (offset < 0.33) {
      c1 = colors[0]
      c2 = colors[1]
      mix = offset / 0.33
    } else if (offset < 0.66) {
      c1 = colors[1]
      c2 = colors[2]
      mix = (offset - 0.33) / 0.33
    } else {
      c1 = colors[2]
      c2 = colors[3]
      mix = (offset - 0.66) / 0.34
    }

    workColor.current.lerpColors(c1, c2, Math.min(Math.max(mix, 0), 1))

    if (colorRef.current) {
      colorRef.current.set(workColor.current)
    }
  })

  return <color ref={colorRef} attach="background" args={['#F2EBE3']} />
}

function Stars() {
  const starData = useMemo(() => {
    return Array.from({ length: 30 }).map(() => ({
      x: (Math.random() - 0.5) * 10,
      y: Math.random() * 4 + 1,
      z: -Math.random() * 5 - 2,
      size: Math.random() * 0.03 + 0.02,
      intensity: Math.random() * 2 + 1
    }))
  }, [])

  return (
    <group>
      {starData.map((star, i) => (
        <mesh key={i} position={[star.x, star.y, star.z]}>
          <sphereGeometry args={[star.size, 8, 8]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#FFFFE0"
            emissiveIntensity={star.intensity}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  )
}

function Scene({ isMobile }: { isMobile: boolean }) {
  const scroll = useScroll()
  const sunRaysRef = useRef<THREE.Group>(null!)
  const cloudsRef = useRef<THREE.Group>(null!)
  const sunGroupRef = useRef<THREE.Group>(null!)
  const moonGroupRef = useRef<THREE.Group>(null!)

  // Scale and position adjustments for mobile
  const scale = isMobile ? 0.5 : 1
  const celestialX = isMobile ? -1 : -2.5
  const celestialY = isMobile ? 0.5 : 1
  const characterX = isMobile ? 0.8 : 2
  const characterY = isMobile ? -0.8 : -1

  useFrame(() => {
    const offset = scroll.offset

    // Smooth opacity transition between sun and moon
    const transitionStart = 0.45
    const transitionEnd = 0.55
    let sunOpacity = 1
    let moonOpacity = 0

    if (offset >= transitionStart && offset <= transitionEnd) {
      const t = (offset - transitionStart) / (transitionEnd - transitionStart)
      sunOpacity = 1 - t
      moonOpacity = t
    } else if (offset > transitionEnd) {
      sunOpacity = 0
      moonOpacity = 1
    }

    // Apply opacity to sun group
    if (sunGroupRef.current) {
      sunGroupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          const material = child.material as THREE.MeshStandardMaterial
          material.opacity = sunOpacity
          material.transparent = true
        }
      })
      sunGroupRef.current.visible = sunOpacity > 0
    }

    // Apply opacity to moon group
    if (moonGroupRef.current) {
      moonGroupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          const material = child.material as THREE.MeshStandardMaterial
          material.opacity = moonOpacity
          material.transparent = true
        }
      })
      moonGroupRef.current.visible = moonOpacity > 0
    }

    // Rotate sun rays slowly
    if (sunRaysRef.current) {
      sunRaysRef.current.rotation.z += 0.005
    }

    // Animate clouds drifting
    if (cloudsRef.current && offset < 0.5) {
      cloudsRef.current.children.forEach((cloud, i) => {
        cloud.position.x += 0.002 * (i % 2 === 0 ? 1 : -1)
        // Wrap around
        if (cloud.position.x > 6) cloud.position.x = -6
        if (cloud.position.x < -6) cloud.position.x = 6
      })
    }
  })

  return (
    <>
      <DynamicBackground />
      <Environment preset="city" />
      <ContactShadows opacity={0.4} scale={10} blur={2} far={4.5} />

      {/* LEFT: Celestial Body - STATIONARY */}
      <group position={[celestialX, celestialY, -2]} scale={scale}>
        {/* SUN with Rays (Scenes 1-2) */}
        <group ref={sunGroupRef}>
          {/* Sun Core */}
          <mesh>
            <sphereGeometry args={[0.6, 64, 64]} />
            <meshStandardMaterial
              color="#FFA500"
              emissive="#FF4500"
              emissiveIntensity={3.5}
              roughness={0.1}
              metalness={0.0}
              toneMapped={false}
            />
          </mesh>

          {/* Sun Rays - 12 triangular rays */}
          <group ref={sunRaysRef}>
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i / 12) * Math.PI * 2
              const distance = 0.85
              const x = Math.cos(angle) * distance
              const y = Math.sin(angle) * distance
              return (
                <mesh key={i} position={[x, y, 0]} rotation={[0, 0, angle + Math.PI / 2]}>
                  <coneGeometry args={[0.12, 0.5, 3]} />
                  <meshStandardMaterial
                    color="#FFD700"
                    emissive="#FFA500"
                    emissiveIntensity={2.5}
                    toneMapped={false}
                  />
                </mesh>
              )
            })}
          </group>
        </group>

        {/* FULL MOON with Craters (Scenes 3-4) */}
        <group ref={moonGroupRef}>
          {/* Main moon sphere */}
          <mesh>
            <sphereGeometry args={[0.65, 64, 64]} />
            <meshStandardMaterial
              color="#D3D3D3"
              emissive="#4a4a5e"
              emissiveIntensity={0.4}
              roughness={0.9}
              metalness={0.0}
            />
          </mesh>

          {/* Craters - dark spots on moon surface */}
          {[
            { pos: [0.3, 0.2, 0.5], size: 0.15 },
            { pos: [-0.2, 0.4, 0.4], size: 0.12 },
            { pos: [0.1, -0.3, 0.5], size: 0.18 },
            { pos: [-0.4, -0.1, 0.4], size: 0.1 },
            { pos: [0.2, -0.5, 0.3], size: 0.08 },
            { pos: [-0.3, 0.5, 0.2], size: 0.14 },
          ].map((crater, i) => (
            <mesh key={i} position={crater.pos as [number, number, number]}>
              <sphereGeometry args={[crater.size, 32, 32]} />
              <meshStandardMaterial
                color="#808080"
                roughness={1.0}
              />
            </mesh>
          ))}
        </group>
      </group>

      {/* DAYTIME: Animated Clouds (Scenes 1-2) - At sun level */}
      <group ref={cloudsRef}>
        {[
          { pos: [-3, 0.8, -4], scale: 0.8 },
          { pos: [1, 1.2, -5], scale: 1.0 },
          { pos: [4, 1.0, -4.5], scale: 0.6 },
          { pos: [-1, 1.1, -6], scale: 0.9 },
        ].map((cloud, i) => (
          <group key={i} position={cloud.pos as [number, number, number]} scale={cloud.scale}>
            {/* Cloud made of overlapping spheres */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshStandardMaterial color="#ffffff" transparent opacity={0.7} />
            </mesh>
            <mesh position={[0.25, 0.1, 0]}>
              <sphereGeometry args={[0.25, 16, 16]} />
              <meshStandardMaterial color="#ffffff" transparent opacity={0.7} />
            </mesh>
            <mesh position={[-0.2, 0.05, 0]}>
              <sphereGeometry args={[0.22, 16, 16]} />
              <meshStandardMaterial color="#ffffff" transparent opacity={0.7} />
            </mesh>
            <mesh position={[0.1, -0.15, 0]}>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshStandardMaterial color="#ffffff" transparent opacity={0.7} />
            </mesh>
          </group>
        ))}
      </group>

      {/* NIGHTTIME: Glowing Stars (Scenes 3-4) */}
      <Stars />

      {/* RIGHT: Office Worker - MOVES with scroll */}
      <OfficeWorker position={[characterX, characterY, 0]} />

      {/* Post Processing */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.9} mipmapBlur intensity={2.0} />
      </EffectComposer>
    </>
  )
}

function App() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Responsive camera settings - aggressive for narrow mobile screens
  const cameraFov = isMobile ? 75 : 30
  const cameraPosition: [number, number, number] = isMobile ? [0, 0, 10] : [0, 0, 5]

  return (
    <div className="w-full h-full font-sans uppercase">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=JetBrains+Mono:wght@400;700&display=swap');
      `}</style>

      <Navbar />

      <Canvas camera={{ position: cameraPosition, fov: cameraFov }} shadows>
        <ScrollControls pages={4} damping={0.2}>
          <Scene isMobile={isMobile} />

          <Scroll html>
            <Overlay />
          </Scroll>
        </ScrollControls>
      </Canvas>

      <div className="glow-frame"></div>
    </div>
  )
}

export default App
