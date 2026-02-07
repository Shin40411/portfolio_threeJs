import { } from '@react-three/drei'

interface BookProps {
    color: string
    title: string
    index: number
}

const Book = ({ color, title, index }: BookProps) => {
    return (
        <div className="group relative w-16 xs:w-18 sm:w-20 md:w-24 h-24 xs:h-26 sm:h-28 md:h-32 m-0.5 xs:m-1 md:m-2 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:scale-105">
            <div
                className="absolute inset-0 rounded-sm shadow-lg overflow-hidden border-l-[3px] border-black/30 z-10"
                style={{ backgroundColor: color }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent opacity-60"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] opacity-5 pointer-events-none"></div>

                <div className="p-1 md:p-2 h-full flex flex-col justify-between text-white select-none relative z-20">
                    <div className="flex justify-between items-start">
                        <div className="text-[7px] md:text-[8px] font-bold opacity-60 uppercase tracking-tighter">Vol. {index + 1}</div>
                        <div className="w-0.5 h-0.5 md:w-1 md:h-1 rounded-full bg-white/30"></div>
                    </div>

                    <div className="text-[9px] md:text-sm font-black leading-tight break-words py-0.5 uppercase italic tracking-tighter border-t border-white/10 pt-1">
                        {title}
                    </div>

                    <div className="flex flex-col gap-0.5 mt-auto opacity-30">
                        <div className="h-px w-full bg-white/20 rounded-full"></div>
                        <div className="h-px w-2/3 bg-white/10 rounded-full"></div>
                    </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none"></div>

                {index % 3 === 0 && (
                    <div className="absolute top-0 right-0 bg-blue-600 text-white text-[4px] md:text-[5px] font-bold px-1.5 md:px-3 py-0.5 rotate-45 translate-x-3 -translate-y-1 shadow-md border border-white/5">
                        NEW
                    </div>
                )}
            </div>

            <div
                className="absolute -bottom-3 md:-bottom-6 left-0 w-full h-3 md:h-6 opacity-20 pointer-events-none scale-y-[-1] blur-[1px] rounded-sm"
                style={{
                    backgroundColor: color,
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)'
                }}
            ></div>

            <div className="absolute -bottom-0.5 left-1 right-1 h-1 md:h-1.5 bg-black/40 blur-md rounded-[100%] transition-transform group-hover:scale-110"></div>
        </div>
    )
}

interface BookshelfProps {
    isMobile: boolean
    isTablet: boolean
}

export function Bookshelf({ isMobile, isTablet }: BookshelfProps) {
    const projects = [
        { title: "THREE.JS", color: "#b91c1c" },
        { title: "REACT", color: "#1e40af" },
        { title: "GLSL", color: "#064e3b" },
        { title: "BLENDER", color: "#92400e" },
        { title: "WEBGL", color: "#7c2d12" },
        { title: "NEXT.JS", color: "#171717" },
        { title: "TS", color: "#1e3a8a" },
        { title: "CSS3D", color: "#155e75" },
    ]

    const chunks = []
    const chunkSize = 4
    for (let i = 0; i < projects.length; i += chunkSize) {
        chunks.push(projects.slice(i, i + chunkSize))
    }

    const RenderShelf = (books: typeof projects, shelfIdx: number) => (
        <div className="relative mb-8 md:mb-12 last:mb-2 group/shelf-tier">
            <div
                className="absolute inset-x-0 -bottom-3 -top-6 md:-bottom-4 md:-top-8 -z-10 rounded-sm shadow-[inset_0_2px_15px_rgba(0,0,0,0.5)]"
                style={{
                    backgroundColor: '#8b5a2b',
                    backgroundImage: `
                        linear-gradient(90deg, transparent 96%, rgba(0,0,0,0.1) 96%),
                        linear-gradient(transparent 98%, rgba(255,255,255,0.03) 98%)
                    `,
                    backgroundSize: '40px 100%, 100% 30px'
                }}
            ></div>

            <div className="flex flex-nowrap justify-center gap-1.5 xs:gap-3 md:gap-4 px-2 xs:px-4 md:px-6 py-2 md:py-3 relative z-10 min-h-[100px] md:min-h-[130px]">
                {books.map((p, i) => (
                    <div key={i} className="flex flex-col items-center">
                        <Book index={shelfIdx * chunkSize + i} {...p} />
                    </div>
                ))}
            </div>

            <div className="relative h-2 md:h-4 w-full z-20">
                <div
                    className="absolute inset-x-0 h-2 md:h-3 -top-1 md:-top-1.5 bg-[#d2b48c] border-t border-white/10"
                    style={{ transform: 'rotateX(75deg)', transformOrigin: 'top', boxShadow: '0 3px 10px rgba(0,0,0,0.4)' }}
                ></div>
                <div className="w-full h-full bg-gradient-to-b from-[#b08968] to-[#7f5539] border-t border-white/5 border-b border-black/30">
                    <div className="mt-0.5 h-px w-full bg-black/10"></div>
                </div>
            </div>
        </div>
    )

    const rotationY = isMobile ? 1 : (isTablet ? 4 : 12)
    const scale = 1.0

    return (
        <div
            className="w-full max-w-[96vw] xs:max-w-[440px] sm:max-w-[540px] md:max-w-[680px] lg:max-w-xl mx-auto mt-6 md:mt-10 flex flex-col p-4 md:p-8 bg-[#582f0e] border-[10px] md:border-[16px] border-[#331800] rounded-xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] overflow-visible relative transition-all duration-700 ease-out origin-center"
            style={{
                transform: `perspective(1200px) rotateY(${rotationY}deg) rotateX(2deg) skewY(-0.5deg) scale(${scale})`,
                transformStyle: 'preserve-3d'
            }}
        >
            <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.6)] pointer-events-none z-30"></div>

            <div className="relative z-40 mb-8 md:mb-12 flex justify-center">
                <div className="px-6 md:px-8 py-2 md:py-3 bg-accent/20 backdrop-blur-md border border-accent/40 rounded-full shadow-[0_6px_25px_rgba(var(--accent-rgb),0.4)] flex flex-col items-center">
                    <h2 className="text-[10px] md:text-sm font-black tracking-[0.4em] md:tracking-[0.6em] uppercase text-accent leading-none text-center">
                        SELECTED PROJECTS
                    </h2>
                    <div className="mt-2 h-0.5 w-12 md:w-16 bg-accent/50 rounded-full"></div>
                </div>
            </div>

            <div className="relative z-10 flex flex-col">
                {chunks.map((chunk, idx) => (
                    <div key={`shelf-${idx}`}>
                        {RenderShelf(chunk, idx)}
                    </div>
                ))}
            </div>
        </div>
    )
}
