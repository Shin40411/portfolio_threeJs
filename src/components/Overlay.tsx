import { motion } from 'framer-motion'
import { Bookshelf } from './Bookshelf'

const Section = ({ children, className = "", right }: { children: React.ReactNode, className?: string, right?: boolean }) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ margin: "-100px" }}
            className={`h-screen w-screen p-8 md:p-12 flex flex-col justify-start lg:justify-center pt-24 lg:pt-0 ${className}`}
        >
            <div className={`max-w-4xl w-full ${right ? 'ml-auto' : 'mr-auto'}`}>
                {children}
            </div>
        </motion.section>
    )
}

export function Overlay({ isMobile, isTablet }: { isMobile: boolean, isTablet: boolean }) {
    return (
        <div className="w-screen select-none">
            <Section className="items-start lg:pl-80 lg:pt-40">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-none tracking-tighter mb-4 mt-20 lg:mt-0 relative">
                    DANG HOANG THO<br />
                    <div className="inline-block bg-purple-600 text-white px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-base lg:text-lg font-black tracking-widest -rotate-3 transform -translate-y-2 md:-translate-y-3 shadow-lg">
                        WEB DEVELOPER
                    </div>
                </h1>
                <div className="mt-8 sm:mt-12 flex gap-4">
                    <span
                        onClick={() => window.dispatchEvent(new CustomEvent('nav-to', { detail: 1 }))}
                        className="text-[10px] sm:text-xs font-mono border border-black/20 px-2 py-1 cursor-pointer hover:bg-black hover:text-white transition-all active:scale-95"
                    >
                        SCROLL TO BEGIN
                    </span>
                </div>
            </Section>

            <Section className="items-start text-left">
                <div className="w-full flex justify-center">
                    <Bookshelf isMobile={isMobile} isTablet={isTablet} />
                </div>
            </Section>

            <Section>
                <div className="relative group max-w-xl mt-6 lg:mt-0 lg:ml-20">
                    <div
                        className="relative p-8 md:p-12 bg-blue-500/[0.03] backdrop-blur-md border border-blue-400/20 rounded-2xl shadow-[0_0_50px_-12px_rgba(96,165,250,0.1)] overflow-hidden transition-all duration-500 group-hover:border-blue-400/40 group-hover:shadow-[0_0_60px_-12px_rgba(96,165,250,0.2)] animate-hologram-flicker"
                    >
                        <div
                            className="absolute inset-0 opacity-[0.03] pointer-events-none"
                            style={{
                                backgroundImage: `linear-gradient(#60a5fa 1px, transparent 1px), linear-gradient(90deg, #60a5fa 1px, transparent 1px)`,
                                backgroundSize: '20px 20px'
                            }}
                        ></div>

                        <div className="absolute inset-x-0 h-40 top-0 bg-gradient-to-b from-transparent via-blue-400/10 to-transparent pointer-events-none animate-scan-slow"></div>

                        <div className="absolute inset-0 bg-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none animate-glitch"></div>

                        <div className="relative z-10 font-mono">
                            <h2 className="text-3xl md:text-4xl font-black mb-10 text-blue-400 tracking-[0.2em] flex items-center gap-3 animate-glitch">
                                <span className="w-2 h-6 bg-blue-400 rounded-full animate-pulse"></span>
                                SKILLS
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                <div className="space-y-4">
                                    <h3 className="text-[10px] uppercase tracking-[0.3em] text-blue-400/50 mb-6 flex items-center gap-2">
                                        <div className="w-1.5 h-px bg-blue-400/50"></div>
                                        Core Technologies
                                    </h3>
                                    <ul className="space-y-4 text-blue-100/90 text-sm md:text-base">
                                        {[
                                            "Three.js & WebGL",
                                            "React Three Fiber",
                                            "GLSL Shaders",
                                            "TypeScript & ESM"
                                        ].map(skill => (
                                            <li key={skill} className="flex items-center gap-4 group/item">
                                                <div className="w-1 h-1 bg-blue-400 rounded-full group-hover/item:scale-150 group-hover/item:shadow-[0_0_8px_#60a5fa] transition-all"></div>
                                                <span className="group-hover/item:text-blue-300 transition-colors uppercase tracking-wider">{skill}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-[10px] uppercase tracking-[0.3em] text-blue-400/50 mb-6 flex items-center gap-2">
                                        <div className="w-1.5 h-px bg-blue-400/50"></div>
                                        Development focus
                                    </h3>
                                    <ul className="space-y-4 text-blue-100/90 text-sm md:text-base">
                                        {[
                                            "Experience Design",
                                            "Real-time Logic",
                                            "Micro-interactions",
                                            "Performance 60FPS"
                                        ].map(skill => (
                                            <li key={skill} className="flex items-center gap-4 group/item">
                                                <div className="w-1 h-1 bg-blue-400/50 rounded-full group-hover/item:bg-blue-300 transition-all"></div>
                                                <span className="group-hover/item:text-blue-300 transition-colors uppercase tracking-wider">{skill}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-400/20 rounded-tl-2xl"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-400/20 rounded-tr-2xl"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-400/20 rounded-bl-2xl"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-400/20 rounded-br-2xl"></div>
                    </div>
                </div>
            </Section>

            <Section className="items-end justify-center lg:pr-20" right>
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-10 md:p-14 lg:p-16 relative group cursor-pointer max-w-[280px] xs:max-w-sm md:max-w-2xl lg:max-w-4xl ml-auto mt-10 lg:mt-0 text-right"
                >
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 italic tracking-tighter">LET'S CONNECT</h2>
                    <p className="text-lg md:text-2xl lg:text-3xl font-mono text-accent mb-12 truncate px-4">HELLO@CLONED-DAVID.IO</p>
                    <div className="flex gap-4 md:gap-6 justify-end">
                        {['GITHUB', 'FACEBOOK', 'EMAIL'].map(link => (
                            <span key={link} className="px-4 md:px-6 py-2 bg-black text-white text-[10px] md:text-xs font-bold hover:bg-accent hover:text-black transition-all transform hover:-translate-y-1">
                                {link}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </Section>
        </div>
    )
}
