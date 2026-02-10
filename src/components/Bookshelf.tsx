import { useState, useCallback } from 'react'
import { BookDetail, type ProjectData } from './BookDetail'

const PROJECTS: ProjectData[] = [
    {
        title: "GOXU.VN",
        color: "#1e40af",
        description: "Built and developed an affiliate marketing platform connecting taxi/grab services to bars, restaurants, and service venues. Includes Service Point Interface, Driver Portal (e-wallet app), and Admin Dashboard.",
        techs: ["React 18", "TypeScript", "NestJS 11", "TypeORM", "MySQL", "Redis", "Socket.io", "PASETO", "Vite", "Material-UI v5"],
        year: "2026",
        role: "Full-Stack Developer",
        demo: "https://goxu.vn/",
        highlights: [
            "Modular and Clean Architecture backend with NestJS 11",
            "E-Contract workflow with digital signature integration",
            "OCR technology for ID card scanning (CMND/CCCD)",
            "E-wallet system integrated with VietQR",
            "JWT replaced with PASETO tokens for security"
        ]
    },
    {
        title: "DCSE",
        color: "#064e3b",
        description: "Enterprise management software with CI/CD automation, request limiting, and caching strategies for high-performance operation.",
        techs: ["ASP.NET API", "SQL Server", "ReactJs", "ViteJs", "RabbitMQ", "Redis", "GitHub Actions"],
        year: "2025",
        role: "Software Engineer",
        demo: "https://quantri.dcse.vn/",
        highlights: [
            "CI/CD with GitHub Actions for automated builds",
            "Rate Limiting and RabbitMQ for parallel task processing",
            "Redis Cache for infrequently changed data",
            "Led the frontend development with ReactJS",
            "Built API hooks using SWR for data reusability"
        ]
    },
    {
        title: "E-LIBRARY",
        color: "#b91c1c",
        description: "Smart library system for schools with AI-powered search. Built frontend with React+Vite and backend with Node.js+Express.",
        techs: ["Node.js", "Express.js", "Sequelize", "Ollama", "ReactJs", "ViteJs"],
        year: "2024 – 2025",
        role: "Full-Stack Developer",
        demo: "https://thuvien.iit.vn/",
        highlights: [
            "Frontend with React.js + Vite.js for optimized performance",
            "RESTful APIs with Node.js and Express.js",
            "Sequelize ORM for data model standardization",
            "AI-powered smart search using Ollama for semantic results"
        ]
    },
    {
        title: "LOTTERY",
        color: "#92400e",
        description: "Lottery portal for xsktcantho.com.vn with real-time result updates, automated notification system, and decentralized content management.",
        techs: ["DNN (.Net 8.0)", "jQuery", "SignalR", "SQL Server"],
        year: "2022 – 2023",
        role: "Web Developer",
        demo: "https://xsktcantho.vn/",
        highlights: [
            "Real-time lottery results via SignalR integration",
            "Automated result notification system",
            "Decentralized notification management (admin/editor/viewer)",
            "Security optimization against DDoS and XSS"
        ]
    },
    {
        title: "ECOMMERCE",
        color: "#7c2d12",
        description: "E-commerce website for electronics, laptops, and electronic installation services. Features ordering, shopping cart, content management, and product administration.",
        techs: ["ReactJs", ".NET", "Tailwind CSS", "SQL Server"],
        year: "2025",
        role: "UI/UX Lead Designer",
        demo: "https://dcs.edu.vn/",
        highlights: [
            "Lead UI designer for the entire project",
            "Shopping cart and order management system",
            "Admin dashboard for content and product management",
            "Responsive design with Tailwind CSS"
        ]
    },
    {
        title: "PORTFOLIO",
        color: "#7e22ce",
        description: "Personal portfolio website built with Three.js, React Three Fiber, and advanced CSS 3D animations. Interactive 3D scene with day/night cycle and animated character.",
        techs: ["Three.js", "React Three Fiber", "TypeScript", "Framer Motion", "Tailwind CSS", "Vite"],
        year: "2025",
        role: "Personal Project",
        demo: "https://danghoangtho-dev.netlify.app",
        highlights: [
            "Interactive 3D scene with sun/moon cycle",
            "CSS 3D animated bookshelf with page-flip effect",
            "Scroll-driven animations with React Three Fiber",
            "Responsive design across all devices"
        ]
    },
    {
        title: "COURSE REG",
        color: "#0f766e",
        description: "Developed a course re-enrollment system for the academic records office using CodeIgniter 3 and jQuery. Built an admissions registration system for the enrollment and career guidance office using CodeIgniter 4.",
        techs: ["CodeIgniter 3", "CodeIgniter 4", "jQuery", "MySQL", "PHP"],
        year: "2022",
        role: "Module Developer",
        demo: "https://dkhp.nctu.edu.vn/",
        highlights: [
            "Course re-enrollment system for students",
            "Admissions registration system",
            "Module-based development with CodeIgniter",
            "Applicant information tracking and management"
        ]
    },
    {
        title: "TOUR BOOKING",
        color: "#155e75",
        description: "Full-stack tour booking application with React frontend and Java Spring Boot backend. Features tour browsing, booking management, and admin dashboard.",
        techs: ["ReactJs", "ViteJs", "Java", "Spring Boot", "MySQL"],
        year: "2024",
        role: "Full-Stack Developer",
        demo: "https://github.com/Shin40411/tourBooking-client",
        highlights: [
            "React + Vite frontend with modern UI",
            "Java Spring Boot RESTful API backend",
            "Tour browsing and booking management",
            "Source: github.com/Shin40411/tourBooking-Api"
        ]
    }
]

interface BookProps {
    project: ProjectData
    index: number
    isOpened: boolean
    onOpen: () => void
}

const Book = ({ project, index, isOpened, onOpen }: BookProps) => {
    return (
        <div
            className={`book-3d-container relative w-12 xs:w-18 sm:w-20 md:w-24 h-[72px] xs:h-26 sm:h-28 md:h-32 m-0.5 xs:m-1 md:m-2 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:scale-105 book-wrapper ${isOpened ? 'zooming' : ''}`}
            onClick={onOpen}
        >
            <div className="book-inner-page bg-amber-50 shadow-inner border border-amber-200/50 z-0 flex items-center justify-center">
                <div className="p-1 text-center">
                    <div className="text-[6px] md:text-[8px] text-amber-800/50 font-mono leading-tight">
                        {project.techs.slice(0, 3).map((t, i) => (
                            <div key={i}>{t}</div>
                        ))}
                    </div>
                </div>
            </div>

            <div
                className={`book-cover absolute inset-0 rounded-sm shadow-lg overflow-hidden border-l-[3px] border-black/30 z-10 ${isOpened ? 'opened' : ''}`}
                style={{ backgroundColor: project.color }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent opacity-60"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] opacity-5 pointer-events-none"></div>

                <div className="p-0.5 md:p-2 h-full flex flex-col justify-between text-white select-none relative z-20">
                    <div className="flex justify-between items-start">
                        <div className="text-[7px] md:text-[8px] font-bold opacity-60 uppercase tracking-tighter">Vol. {index + 1}</div>
                        <div className="w-0.5 h-0.5 md:w-1 md:h-1 rounded-full bg-white/30"></div>
                    </div>

                    <div className="text-[8px] md:text-sm font-black leading-tight break-words py-0.5 uppercase italic tracking-tighter border-t border-white/10 pt-1">
                        {project.title}
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

                <div
                    className="book-cover-back bg-amber-100 border border-amber-200/80"
                >
                    <div className="p-1 md:p-2 h-full flex flex-col justify-center items-center text-amber-800/40">
                        <div className="text-[6px] md:text-[8px] font-bold uppercase tracking-wider">{project.year}</div>
                        <div className="mt-1 w-4 h-px bg-amber-400/30"></div>
                    </div>
                </div>
            </div>

            <div
                className="absolute -bottom-3 md:-bottom-6 left-0 w-full h-3 md:h-6 opacity-20 pointer-events-none scale-y-[-1] blur-[1px] rounded-sm"
                style={{
                    backgroundColor: project.color,
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
    isSmallLaptop?: boolean
}

export function Bookshelf({ isMobile, isTablet, isSmallLaptop }: BookshelfProps) {
    const [openedIndex, setOpenedIndex] = useState<number | null>(null)
    const [showDetail, setShowDetail] = useState(false)
    const [detailProject, setDetailProject] = useState<ProjectData | null>(null)

    const handleOpenBook = useCallback((index: number) => {
        setOpenedIndex(index)

        setTimeout(() => {
            setDetailProject(PROJECTS[index])
            setShowDetail(true)
        }, 1000)
    }, [])

    const handleCloseDetail = useCallback(() => {
        setShowDetail(false)
        setDetailProject(null)
        setOpenedIndex(null)
    }, [])

    const chunkSize = 4
    const chunks: ProjectData[][] = []
    for (let i = 0; i < PROJECTS.length; i += chunkSize) {
        chunks.push(PROJECTS.slice(i, i + chunkSize))
    }

    const RenderShelf = (books: ProjectData[], shelfIdx: number) => (
        <div className="relative mb-8 md:mb-12 last:mb-2 group/shelf-tier">
            <div
                className="absolute inset-x-0 -bottom-3 -top-6 md:-bottom-4 md:-top-8 -z-10 rounded-sm shadow-[inset_0_2px_15px_rgba(0,0,0,0.5)]"
                style={{
                    backgroundColor: '#a68a64',
                    backgroundImage: `
                        linear-gradient(90deg, transparent 96%, rgba(0,0,0,0.1) 96%),
                        linear-gradient(transparent 98%, rgba(255,255,255,0.03) 98%)
                    `,
                    backgroundSize: '40px 100%, 100% 30px'
                }}
            ></div>

            <div className="flex flex-nowrap justify-center gap-1 xs:gap-3 md:gap-4 px-2 xs:px-4 md:px-6 py-2 md:py-3 relative z-10 min-h-[76px] md:min-h-[130px]">
                {books.map((p, i) => {
                    const globalIndex = shelfIdx * chunkSize + i
                    return (
                        <div key={i} className="flex flex-col items-center">
                            <Book
                                project={p}
                                index={globalIndex}
                                isOpened={openedIndex === globalIndex}
                                onOpen={() => handleOpenBook(globalIndex)}
                            />
                        </div>
                    )
                })}
            </div>

            <div className="relative h-2 md:h-4 w-full z-20">
                <div
                    className="absolute inset-x-0 h-2 md:h-3 -top-1 md:-top-1.5 bg-[#e6ccb2] border-t border-white/10"
                    style={{ transform: 'rotateX(75deg)', transformOrigin: 'top', boxShadow: '0 3px 10px rgba(0,0,0,0.4)' }}
                ></div>
                <div className="w-full h-full bg-gradient-to-b from-[#c6ac8f] to-[#a68a64] border-t border-white/5 border-b border-black/30">
                    <div className="mt-0.5 h-px w-full bg-black/10"></div>
                </div>
            </div>
        </div>
    )

    const rotationY = isMobile ? 5 : (isTablet ? 12 : (isSmallLaptop ? 18 : 22))
    const scale = isSmallLaptop ? 0.85 : 1.0

    return (
        <>
            <div
                className="w-full max-w-[96vw] xs:max-w-[440px] sm:max-w-[540px] md:text-680px] lg:max-w-xl mx-auto lg:mx-0 lg:ml-0 mt-6 md:mt-10 flex flex-col p-2 sm:p-4 md:p-8 bg-[#7f4f24] border-[6px] sm:border-[10px] md:border-[16px] border-[#582f0e] rounded-xl shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] overflow-visible relative transition-all duration-700 ease-out origin-center"
                style={{
                    transform: `perspective(1200px) rotateY(${rotationY}deg) rotateX(2deg) skewY(-0.5deg) scale(${scale})`,
                    transformStyle: 'preserve-3d'
                }}
            >
                <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.6)] pointer-events-none z-30"></div>

                <div className="relative z-40 mb-8 md:mb-12 flex justify-center">
                    <div className="px-6 md:px-8 py-2 md:py-3 bg-accent/20 backdrop-blur-md border border-accent/40 rounded-full shadow-[0_6px_25px_rgba(var(--accent-rgb),0.4)] flex flex-col items-center">
                        <h2 className="text-[10px] md:text-sm font-black tracking-[0.4em] md:tracking-[0.6em] uppercase text-accent leading-none text-center">
                            PROJECTS
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

            {showDetail && detailProject && (
                <BookDetail project={detailProject} onClose={handleCloseDetail} />
            )}
        </>
    )
}
