import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll } from '@react-three/drei'
import { Overlay } from './components/Overlay'
import { Navbar } from './components/Navbar'
import { useEffect, useState } from 'react'
import { Experience } from './components/Experience/Experience'
import { ScrollHandler, ScrollObserver } from './components/ScrollManager'
import { Loader } from './components/Loader'
import { MusicToggle } from './components/MusicToggle'

function App() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isSmallLaptop, setIsSmallLaptop] = useState(false)
  const [activePage, setActivePage] = useState(0)

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth
      setIsMobile(w < 768)
      setIsTablet(w >= 768 && w < 1024)
      setIsSmallLaptop(w >= 1024 && w < 1366)
    }
    check(); window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const cameraFov = isMobile ? 75 : (isTablet ? 60 : (isSmallLaptop ? 45 : 30))
  const cameraPosition: [number, number, number] = isMobile ? [0, -0.5, 10] : (isTablet ? [0, -0.5, 8] : (isSmallLaptop ? [0, -0.2, 6] : [0, 0, 5]))

  return (
    <div className="w-full h-full font-sans uppercase">
      <Loader />
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=JetBrains+Mono:wght@400;700&display=swap');`}</style>
      <Navbar activePage={activePage} />

      {/* Scroll to Top Button */}
      <button
        onClick={() => {
          window.dispatchEvent(new CustomEvent('nav-to', { detail: 0 }));
        }}
        className={`fixed bottom-12 right-12 z-[100] p-4 bg-white text-black rounded-full shadow-2xl transition-all duration-500 transform ${activePage === 3 ? 'translate-y-0 opacity-100 scale-100 pointer-events-auto' : 'translate-y-20 opacity-0 scale-50 pointer-events-none'} hover:scale-110 active:scale-90 hover:bg-accent hover:text-white group`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 transition-transform group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>

      <Canvas camera={{ position: cameraPosition, fov: cameraFov }} shadows>
        <ScrollControls pages={4} damping={0.2}>
          <ScrollObserver onPageChange={setActivePage} />
          <ScrollHandler />
          <Experience isMobile={isMobile} isTablet={isTablet} isSmallLaptop={isSmallLaptop} />
          <Scroll html><Overlay isMobile={isMobile} isTablet={isTablet} isSmallLaptop={isSmallLaptop} /></Scroll>
        </ScrollControls>
      </Canvas>
      <div id="character-tooltip" style={{
        position: 'fixed',
        background: 'rgba(40, 40, 40, 0.95)',
        color: '#fff',
        fontSize: '11px',
        padding: '4px 8px',
        borderRadius: '4px',
        pointerEvents: 'none',
        zIndex: 9999,
        whiteSpace: 'nowrap',
        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
        display: 'none'
      }}>
        👋 Click me!
      </div>
      <MusicToggle />
      <div className="glow-frame"></div>
    </div>
  )
}

export default App
