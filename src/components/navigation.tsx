import Link from "next/link";

export default function Navigation() {
    return <nav className="bg-gray-900 absolute w-full right-0 top-0 p-3 md:bg-transparent">
        <div className="container mx-auto">
            <div className="flex justify-between">
                <div className="flex space-x-7">
                    <div className="m-auto">
                        <a className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl" href="/">
                            <span className="logo-full-name bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-pink-800 to-purple-700 py-1">Tyler Latshaw</span>
                        </a>
                    </div>
                </div>
                {/* Navbar items */}
                <div className="hidden md:flex items-center space-x-3">
                    <Link href="/" className="py-4 px-2 text-blue-300 no-underline hover:text-green-500 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out">Home</Link>
                    <Link href="resume" className="py-4 px-2 text-blue-300 no-underline hover:text-green-500 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out">Resume</Link>
                    <Link href="portfolio" className="py-4 px-2 text-blue-300 no-underline hover:text-green-500 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out">Portfolio</Link>
                    <Link href="interests" className="py-4 px-2 text-blue-300 no-underline hover:text-green-500 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out">Interests</Link>
                    <Link href="contact-me" className="py-4 px-2 text-blue-300 no-underline hover:text-green-500 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out">Contact Me</Link>
                </div>

                {/* Mobile menu button */}
                <div className="md:hidden flex items-center">
                    <button className="outline-none mobile-menu-button">
                        <svg className=" w-6 h-6 text-gray-500 hover:text-green-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        {/* Mobile menu */}
        <div className="hidden mobile-menu absolute bg-gray-900 drop-shadow-lg w-full right-0 mt-3">
            <ul>
                <li><a href="/" className="nav-link block text-sm mx-3 px-3 py-3 hover:bg-green-500 hover:font-semibold transition duration-300">Home</a></li>
                <li><a href="resume" className="nav-link block text-sm mx-3 px-3 py-3 hover:bg-green-500 hover:font-semibold transition duration-300">Resume</a></li>
                <li><a href="portfolio" className="nav-link block text-sm mx-3 px-3 py-3 hover:bg-green-500 hover:font-semibold transition duration-300">Portfolio</a></li>
                <li><a href="interests" className="nav-link block text-sm mx-3 px-3 py-3 hover:bg-green-500 hover:font-semibold transition duration-300">Interests</a></li>
                <li><a href="contact-me" className="nav-link block text-sm mx-3 px-3 py-3 hover:bg-green-500 hover:font-semibold transition duration-300">Contact Me</a></li>
            </ul>
        </div>
    </nav>;
}