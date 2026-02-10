import { useState } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'

export interface ProjectData {
    title: string
    color: string
    description: string
    techs: string[]
    year: string
    role: string
    demo?: string
    highlights: string[]
}

interface BookDetailProps {
    project: ProjectData
    onClose: () => void
}

export function BookDetail({ project, onClose }: BookDetailProps) {
    const [closing, setClosing] = useState(false)

    const handleClose = () => {
        setClosing(true)
        setTimeout(onClose, 400)
    }

    return createPortal(
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 book-detail-overlay ${closing ? 'closing' : ''}`}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
            onClick={handleClose}
        >
            <motion.div
                initial={{ rotateY: -10, scale: 0.9 }}
                animate={{ rotateY: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                className="relative w-full max-w-4xl max-h-[85vh] overflow-hidden"
                style={{ perspective: '1500px', transformStyle: 'preserve-3d' }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden shadow-[0_0_80px_-20px_rgba(0,0,0,0.8)] border border-white/10">
                    <div
                        className="relative md:w-1/2 p-8 md:p-10 flex flex-col justify-between min-h-[280px]"
                        style={{ backgroundColor: project.color }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/30 pointer-events-none"></div>
                        <div className="absolute inset-0 page-shine pointer-events-none"></div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-2 h-8 rounded-full bg-white/40"></div>
                                <span className="text-[10px] font-bold text-white/60 tracking-[0.3em] uppercase">{project.year}</span>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-none mb-3">
                                {project.title}
                            </h2>
                            <p className="text-xs font-bold text-white/60 tracking-[0.2em] uppercase mb-6">
                                {project.role}
                            </p>
                            <p className="text-sm md:text-base text-white/80 leading-relaxed normal-case">
                                {project.description}
                            </p>
                        </div>

                        {project.demo && (
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative z-10 mt-8 inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white text-xs font-bold tracking-widest uppercase hover:bg-white/30 transition-all hover:scale-105 active:scale-95 no-underline w-fit"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                View Demo
                            </a>
                        )}

                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-tl-full pointer-events-none"></div>
                    </div>

                    <div className="md:w-1/2 p-8 md:p-10 bg-[#1a1a2e] relative overflow-y-auto max-h-[50vh] md:max-h-[85vh]">
                        <div
                            className="absolute inset-0 opacity-[0.02] pointer-events-none"
                            style={{
                                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                                backgroundSize: '20px 20px'
                            }}
                        ></div>

                        <div className="relative z-10">
                            <h3 className="text-[10px] font-bold tracking-[0.3em] text-blue-400/60 uppercase mb-6 flex items-center gap-2">
                                <div className="w-1.5 h-px bg-blue-400/50"></div>
                                Tech Stack
                            </h3>
                            <div className="flex flex-wrap gap-2 mb-10">
                                {project.techs.map(tech => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1.5 text-[10px] font-bold tracking-wider uppercase rounded-md border transition-all hover:scale-105"
                                        style={{
                                            backgroundColor: `${project.color}15`,
                                            borderColor: `${project.color}30`,
                                            color: '#93a3b8'
                                        }}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {project.highlights.length > 0 && (
                                <>
                                    <h3 className="text-[10px] font-bold tracking-[0.3em] text-blue-400/60 uppercase mb-6 flex items-center gap-2">
                                        <div className="w-1.5 h-px bg-blue-400/50"></div>
                                        Highlights
                                    </h3>
                                    <ul className="space-y-3">
                                        {project.highlights.map((item, i) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.3 + i * 0.1 }}
                                                className="flex items-start gap-3 text-sm text-gray-400 normal-case leading-relaxed"
                                            >
                                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: project.color }}></div>
                                                {item}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 md:top-4 md:right-4 w-8 h-8 md:w-10 md:h-10 bg-black/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-black/70 hover:border-white/40 transition-all hover:scale-110 active:scale-90 z-50 cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </motion.div>
        </div>,
        document.body
    )
}
