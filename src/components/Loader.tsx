import { useProgress } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export function Loader() {
    const { progress } = useProgress()
    const [isFinished, setIsFinished] = useState(false)

    useEffect(() => {
        if (progress === 100) {
            const timer = setTimeout(() => setIsFinished(true), 1200)
            return () => clearTimeout(timer)
        }
    }, [progress])

    return (
        <AnimatePresence>
            {!isFinished && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.8, ease: "easeInOut" }
                    }}
                    className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#FDFCFB]"
                >
                    <div className="relative flex flex-col items-center">
                        {/* Elegant Progress Circle */}
                        <div className="relative w-24 h-24 mb-8">
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                                <circle
                                    className="text-black/5"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="45"
                                    cx="50"
                                    cy="50"
                                />
                                <motion.circle
                                    className="text-black"
                                    strokeWidth="2"
                                    strokeDasharray="283"
                                    animate={{ strokeDashoffset: 283 - (283 * progress) / 100 }}
                                    transition={{ duration: 0.5, ease: "linear" }}
                                    strokeLinecap="round"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="45"
                                    cx="50"
                                    cy="50"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-sm font-mono font-bold">{Math.round(progress)}%</span>
                            </div>
                        </div>

                        {/* Text Animation */}
                        <div className="flex flex-col items-center gap-2">
                            <motion.h1
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-xs font-mono tracking-[0.4em] uppercase text-black/40"
                            >
                                Initializing Experience
                            </motion.h1>
                            <div className="flex gap-1">
                                {[0, 1, 2].map((i) => (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            opacity: [0.2, 1, 0.2],
                                            scale: [0.8, 1, 0.8]
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            delay: i * 0.2
                                        }}
                                        className="w-1 h-1 bg-black rounded-full"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer Branding */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        className="absolute bottom-12 font-mono text-[8px] tracking-[0.5em] uppercase text-black"
                    >
                        Portfolio / MMXXVI / Antigravity
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
