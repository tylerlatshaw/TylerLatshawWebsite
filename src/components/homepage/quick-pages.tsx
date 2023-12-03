import Image from "next/image";
import Link from "next/link";
import SendIcon from "@mui/icons-material/Send";

export default function QuickPages() {

    return (
        <>
            <div className="max-w-sm bg-slate-800 rounded-lg shadow text-left">
                <Link href="/resume">
                    <Image src="/static/cover-image-placeholder.png" width={384} height={200} alt="Resume" className="rounded-t-lg" priority={false} />
                </Link>
                <div className="p-5">
                    <Link href="/resume">
                        <span className="uppercase font-bold tracking-wide text-green-500 hover:text-green-600 text-lg">Resume</span>
                    </Link>
                    <p className="mb-3 font-normal text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <Link href="/resume" className="flex items-center w-fit px-3 py-2 text-base font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-2 focus:outline-none focus:ring-green-500">
                        Read more&nbsp;<SendIcon className="text-base flex items-center" />
                    </Link>
                </div>
            </div>

            <div className="max-w-sm bg-slate-800 rounded-lg shadow text-left">
                <Link href="/portfolio">
                    <Image src="/static/cover-image-placeholder.png" width={384} height={200} alt="Portfolio" className="rounded-t-lg" priority={false} />
                </Link>
                <div className="p-5">
                    <Link href="/portfolio">
                        <span className="uppercase font-bold tracking-wide text-pink-600 hover:text-pink-700 text-lg">Portfolio</span>
                    </Link>
                    <p className="mb-3 font-normal text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <Link href="/portfolio" className="flex items-center w-fit px-3 py-2 text-base font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-2 focus:outline-none focus:ring-pink-600">
                        Read more&nbsp;<SendIcon className="text-base flex items-center" />
                    </Link>
                </div>
            </div>

            <div className="max-w-sm bg-slate-800 rounded-lg shadow text-left">
                <Link href="/interests">
                    <Image src="/static/cover-image-placeholder.png" width={384} height={200} alt="Interests" className="rounded-t-lg" priority={false} />
                </Link>
                <div className="p-5">
                    <Link href="/interests">
                        <span className="uppercase font-bold tracking-wide text-purple-500 hover:text-purple-600 text-lg">Interests</span>
                    </Link>
                    <p className="mb-3 font-normal text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <Link href="/interests" className="flex items-center w-fit px-3 py-2 text-base font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-2 focus:outline-none focus:ring-purple-600">
                        <span className="flex items-center">Read more&nbsp;<SendIcon className="text-base flex items-center" /></span>
                    </Link>
                </div>
            </div>
        </>
    );
}