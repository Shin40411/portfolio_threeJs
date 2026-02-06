export function Navbar() {
    return (
        <header className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-50 mix-blend-difference text-white">
            <div className="font-bold text-xl tracking-tighter">DAVID.CLONE</div>
            <nav className="flex gap-8 text-sm items-center">
                <a href="#about" className="hover:opacity-50 transition-opacity">ABOUT</a>
                <a href="#projects" className="hover:opacity-50 transition-opacity">PROJECTS</a>
                <a href="#contact" className="hover:opacity-50 transition-opacity">CONTACT</a>
                <button className="bg-brand text-white px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform">
                    GET IN TOUCH
                </button>
            </nav>
        </header>
    )
}
