import { useEffect, useRef } from 'react'
import { useScroll } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export function ScrollHandler() {
    const scroll = useScroll()

    useEffect(() => {
        const onNavTo = (e: Event) => {
            const page = (e as CustomEvent).detail
            const targetScroll = (page / (scroll.pages - 1)) * (scroll.el.scrollHeight - scroll.el.clientHeight)

            scroll.el.scrollTo({
                top: targetScroll,
                behavior: 'smooth'
            })
        }

        window.addEventListener('nav-to', onNavTo)
        return () => window.removeEventListener('nav-to', onNavTo)
    }, [scroll])

    return null
}

export function ScrollObserver({ onPageChange }: { onPageChange: (page: number) => void }) {
    const scroll = useScroll()
    const lastPage = useRef(-1)

    useFrame(() => {
        const page = Math.round(scroll.offset * (scroll.pages - 1))
        if (page !== lastPage.current) {
            lastPage.current = page
            onPageChange(page)
        }
    })
    return null
}
