import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Navbar({ activePage }: { activePage: number }) {
    const [isOpen, setIsOpen] = useState(false)

    const navigateTo = (page: number) => {
        window.dispatchEvent(new CustomEvent('nav-to', { detail: page }));
        setIsOpen(false)
    };

    const navItems = [
        { label: 'PROJECTS', page: 1 },
        { label: 'EXPERIENCE', page: 2 },
    ];

    return (
        <header className="fixed top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-[100] text-white">
            <div
                className="flex items-center gap-3 cursor-pointer group"
                onClick={() => navigateTo(0)}
            >
                <img
                    src="/logo.png"
                    alt="Logo"
                    className="h-8 w-auto transition-transform group-hover:scale-110"
                />
                <span className={`font-black text-xl tracking-tighter transition-colors ${activePage === 1 ? 'text-black' : 'text-white'}`}>
                    PORTFOLIO
                </span>
            </div>

            {/* Desktop Menu */}
            <div className={`hidden lg:flex items-center gap-2 px-2 py-2 border rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)] animate-fade-in transition-all duration-500 ${activePage === 1 ? 'bg-white/80 border-black/10 text-black' : 'bg-black border-white/10 text-white'}`}>
                <nav className="flex items-center gap-2">
                    {navItems.map((item) => (
                        <button
                            key={item.page}
                            onClick={() => navigateTo(item.page)}
                            className={`px-6 py-2 text-sm font-bold transition-all cursor-pointer rounded-full ${activePage === item.page ? (activePage === 1 ? 'bg-black text-white' : 'text-accent') : (activePage === 1 ? 'text-black opacity-40 hover:opacity-100' : 'text-white opacity-50 hover:opacity-100')}`}
                        >
                            {item.label}
                        </button>
                    ))}
                    <button
                        onClick={() => navigateTo(3)}
                        className={`cursor-pointer ml-2 px-8 py-2 rounded-full text-sm font-bold transition-all transform active:scale-95 ${activePage === 3 ? 'bg-accent text-black scale-105 shadow-lg' : (activePage === 1 ? 'text-black opacity-40 hover:opacity-100' : 'text-white opacity-50 hover:opacity-100')}`}
                    >
                        CONTACT
                    </button>
                </nav>
            </div>

            {/* Hamburger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`lg:hidden w-12 h-12 flex flex-col justify-center items-center gap-1.5 z-[110] transition-all active:scale-90 border border-white/10 rounded-full shadow-2xl ${isOpen ? 'bg-accent' : 'bg-black'}`}
            >
                <motion.div
                    animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                    className={`w-6 h-0.5 rounded-full ${isOpen ? 'bg-black' : 'bg-white'}`}
                />
                <motion.div
                    animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                    className={`w-6 h-0.5 rounded-full ${isOpen ? 'bg-black' : 'bg-white'}`}
                />
                <motion.div
                    animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                    className={`w-6 h-0.5 rounded-full ${isOpen ? 'bg-black' : 'bg-white'}`}
                />
            </button>

            {/* Mobile / Tablet Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 w-full max-w-sm bg-black z-[105] flex flex-col p-12 lg:hidden shadow-[-20px_0_50px_rgba(0,0,0,0.8)] border-l border-white/10"
                    >
                        <div className="flex flex-col gap-10 mt-20">
                            <div
                                className={`text-4xl font-black tracking-tighter cursor-pointer transition-all ${activePage === 0 ? 'text-accent' : 'text-white opacity-40 hover:opacity-100 hover:text-accent'}`}
                                onClick={() => navigateTo(0)}
                            >
                                HOME
                            </div>
                            {navItems.map((item) => (
                                <button
                                    key={item.page}
                                    onClick={() => navigateTo(item.page)}
                                    className={`text-left text-4xl font-black tracking-tighter transition-all ${activePage === item.page ? 'text-accent' : 'text-white opacity-40 hover:opacity-100 hover:text-accent'}`}
                                >
                                    {item.label}
                                </button>
                            ))}
                            <button
                                onClick={() => navigateTo(3)}
                                className={`mt-4 text-left text-5xl font-black tracking-tighter transition-all ${activePage === 3 ? 'text-accent' : 'text-white opacity-40 hover:opacity-100 hover:text-accent'}`}
                            >
                                CONTACT
                            </button>
                        </div>

                        <div className="mt-auto flex flex-col gap-4 text-xs font-mono opacity-20 uppercase tracking-widest leading-relaxed text-white">
                            <p>Based in Vietnam</p>
                            <p>Available for freelance</p>
                            <p>&copy; MMXXVI Portfolio</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
