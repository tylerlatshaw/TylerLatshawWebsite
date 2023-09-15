import dynamic from "next/dynamic";
import Link from "next/link";

const FormFooterContact = dynamic(() => import("./footer-contact"), {
    ssr: false,
});

export default function Footer() {
    return (
        <>
            <div className="h-2 bg-gradient-to-r from-green-600 via-pink-800 to-purple-700"></div>
            <div className="w-full py-8 bg-slate-800">
                <div className="container mx-auto">
                    <div className="grid md:grid-cols-3">
                        <div className="grid grid-col content-start w-fit mx-auto py-6">
                            <div className="m-auto">
                                <Link className="grid items-center text-indigo-400 no-underline hover:no-underline font-bold text-3xl lg:text-4xl" href="/">
                                    <span className="logo-full-name bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-pink-800 to-purple-700">Tyler Latshaw</span>
                                </Link>
                            </div>
                            <div className="grid justify-items-center">
                                <div className="mt-6">
                                    <a href="mailto:tyler@tylerlatshaw.com" className="group block" target="_blank">
                                        <div className="flex items-center">
                                            <i className="far fa-envelope fa-lg fa-fw text-white m-2 group-hover:text-green-500"></i>
                                            <h3 className="text-white group-hover:text-green-500">tyler@tylerlatshaw.com</h3>
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="grid justify-items-center">
                                <div className="mt-1">
                                    <a href="https://www.linkedin.com/in/tylerlatshaw/" className="group block" target="_blank">
                                        <div className="flex items-center">
                                            <i className="fab fa-linkedin fa-lg fa-fw text-white m-2 group-hover:text-green-500"></i>
                                            <h3 className="text-white group-hover:text-green-500">Connect With Me On LinkedIn</h3>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:border-x-2 border-slate-700 py-6">
                            <div className="grid grid-cols-2">
                                <div className="grid grid-col content-start w-fit mx-auto">
                                    <span className="">Quick Links</span>
                                    <Link href="/" className="w-fit text-blue-300 no-underline hover:text-green-500 hover:text-underline transform hover:scale-125 duration-300 ease-in-out">Home</Link>
                                    <Link href="resume" className="w-fit text-blue-300 no-underline hover:text-green-500 hover:text-underline transform hover:scale-125 duration-300 ease-in-out">Resume</Link>
                                    <Link href="portfolio" className="w-fit text-blue-300 no-underline hover:text-green-500 hover:text-underline transform hover:scale-125 duration-300 ease-in-out">Portfolio</Link>
                                    <Link href="interests" className="w-fit text-blue-300 no-underline hover:text-green-500 hover:text-underline transform hover:scale-125 duration-300 ease-in-out">Interests</Link>
                                    <Link href="contact-me" className="w-fit text-blue-300 no-underline hover:text-green-500 hover:text-underline transform hover:scale-125 duration-300 ease-in-out">Contact Me</Link>
                                </div>
                                <div className="grid grid-col content-start w-fit mx-auto">
                                    <span className="">Site Links</span>
                                    <Link href="./privacy-policy" className="w-fit text-blue-300 no-underline hover:text-green-500 hover:text-underline transform hover:scale-125 duration-300 ease-in-out">Privacy Policy</Link>
                                    <Link href="/" className="w-fit text-blue-300 no-underline hover:text-green-500 hover:text-underline transform hover:scale-125 duration-300 ease-in-out">Sitemap</Link>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-3 sm:px-0 sm:w-[80%] mx-auto py-6 bg-white md:bg-transparent">
                            <span>Send Me a Message</span>
                            <FormFooterContact />
                        </div>
                    </div>
                </div>
                <div className="w-full pt-6 text-md fade-in text-gray-400">
                    <div className="text-center" id="copyright">
                        {generateCopyright()}
                    </div>
                </div>
            </div>
        </>
    );
}

function generateCopyright() {
    return <div dangerouslySetInnerHTML={createCopyright()} />;
}

function createCopyright() {
    var year = new Date().getFullYear();

    var copyright = `&copy; ${year} Tyler J. Latshaw. All rights reserved. | Website designed by Tyler Latshaw based on <a href="https://github.com/tailwindtoolbox" className="underline hover:text-slate-400" target="_blank">Tailwind Toolbox</a>.`;

    return { __html: copyright };
}