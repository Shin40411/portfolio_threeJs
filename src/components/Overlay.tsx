import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

const Section = ({ children, className = "" }: { children: ReactNode, className?: string }) => (
    <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ margin: "-100px" }}
        className={`h-screen w-screen p-12 flex flex-col justify-center ${className}`}
    >
        <div className="max-w-4xl mx-auto w-full">
            {children}
        </div>
    </motion.section>
)

export function Overlay() {
    return (
        <div className="w-screen select-none">
            <Section className="items-start">
                <h1 className="text-7xl md:text-9xl font-black leading-none tracking-tighter mb-4">
                    WEB DEVELOPER<br />
                    <span className="text-accent underline decoration-4 underline-offset-8">THREE.JS</span>
                </h1>
                <p className="text-xl max-w-md normal-case opacity-70 font-sans mt-8">
                    I build immersive 3D experiences that bridge the gap between imagination and the browser.
                </p>
                <div className="mt-12 flex gap-4">
                    <span className="text-xs font-mono bg-black text-white px-2 py-1">BUILD v0.1.0</span>
                    <span className="text-xs font-mono border border-black/20 px-2 py-1">SCROLL TO BEGIN</span>
                </div>
            </Section>

            <Section className="items-end text-right">
                <h2 className="text-6xl font-black mb-8 tracking-tighter italic">THE ROOMS</h2>
                <div className="grid grid-cols-2 gap-6 max-w-2xl ml-auto">
                    {[1, 2, 3, 4].map((i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05, borderColor: "#00E5FF" }}
                            className="aspect-video bg-white/50 backdrop-blur-md border-2 border-black/5 p-6 transition-all group cursor-pointer overflow-hidden relative"
                        >
                            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="relative z-10 w-full h-full border border-black/10 flex items-center justify-center text-accent font-black text-xl italic group-hover:text-black">
                                PROJECT {i}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Section>

            <Section>
                <h2 className="text-6xl font-black mb-6 tracking-tighter">EXPERIENCE</h2>
                <div className="space-y-6 opacity-80 normal-case font-sans max-w-2xl">
                    <p className="text-2xl leading-relaxed">
                        Specializing in making the virtual feel <span className="text-accent font-black uppercase">tangible</span>.
                    </p>
                    <div className="grid grid-cols-2 gap-8 text-sm border-t border-black/10 pt-8 mt-8 font-mono uppercase">
                        <div>
                            <h3 className="font-black mb-2 text-accent">Tech Stack</h3>
                            <ul className="space-y-1">
                                <li>React Three Fiber</li>
                                <li>GLSL Shaders</li>
                                <li>Framer Motion</li>
                                <li>Node.js</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-black mb-2 text-accent">Focus</h3>
                            <ul className="space-y-1">
                                <li>Performance</li>
                                <li>Storytelling</li>
                                <li>Micro-interactions</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Section>

            <Section className="items-center text-center">
                <motion.div
                    whileHover={{ scale: 0.98 }}
                    className="p-16 border-[12px] border-accent/20 bg-white/10 backdrop-blur-sm relative group cursor-pointer overflow-hidden"
                >
                    <div className="absolute inset-0 border border-accent/50 group-hover:border-accent transition-colors m-2"></div>
                    <h2 className="text-7xl font-black mb-4 italic tracking-tighter">LET'S CONNECT</h2>
                    <p className="text-3xl font-mono text-accent mb-12">HELLO@CLONED-DAVID.IO</p>
                    <div className="flex gap-6 justify-center">
                        {['GITHUB', 'LINKEDIN', 'X'].map(link => (
                            <span key={link} className="px-6 py-2 bg-black text-white text-xs font-bold hover:bg-accent hover:text-black transition-all transform hover:-translate-y-1">
                                {link}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </Section>

            <footer className="p-12 text-center text-[10px] opacity-40 font-mono tracking-widest uppercase">
                &copy; MMXXVI / INSPIRED BY DAVID HECKHOFF / ANTIGRAVITY CLONE
            </footer>
        </div>
    )
}
