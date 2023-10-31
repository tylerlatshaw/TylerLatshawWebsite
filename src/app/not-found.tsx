"use client";

import Link from "next/link";
import { useUrl } from "nextjs-current-url";
import RootLayout from "./(main-site)/layout";
import FolderOffOutlinedIcon from "@mui/icons-material/FolderOffOutlined";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function NotFound() {

    const { href } = useUrl() ?? {};

    return <>
        <RootLayout>
            <div className="h-full px-4 md:px-0 mb-16 md:mb-40">
                <div className="container flex flex-wrap w-full mx-auto pt-28 md:pt-36">

                    <div className="grid grid-cols-1 md:grid-cols-2 w-full mt-3 md:mt-16">

                        <div className="self-center text-center">
                            <h1 className="w-full text-[8rem] md:text-[12rem] leading-none font-bold">404</h1>
                        </div>
                        <div className="self-center text-center">
                            <FolderOffOutlinedIcon className="text-[6rem] md:text-[9rem] leading-none my-8 md:m-0" />
                            <h2 className="w-full text-4xl md:text-5xl leading-none font-bold">Page Not Found</h2>
                        </div>

                    </div>

                    <div className="flex flex-col justify-center w-full mt-16 md:mt-24 text-center">
                        <p className="text-xl md:text-3xl leading-none font-semibold">
                            Sorry! This page does not exist. <br />
                        </p>
                        <p className="text-lg md:text-2xl leading-tight mt-6 break-all md:break-words mx-auto">
                            <div className="w-fit px-5 py-4 rounded-lg border-2 border-green-500 bg-gray-800/60">
                                <span className="font-semibold select-none">Page:&nbsp;</span>{href}
                            </div>
                        </p>
                    </div>

                    <div className="flex flex-col justify-center w-full mt-16 md:mt-24 mb-4 md:mb-0 text-center">
                        <Link href="/" className="drop-shadow-lg">
                            <Button className="button text-white bg-pink-700 hover:bg-pink-800 focus:ring-2 focus:outline-none focus:ring-pink-900 font-medium rounded-lg text-2xl px-5 py-2.5 text-center">
                                <span className="flex items-center">
                                    <>Go Back Home&nbsp;<SendIcon className="text-lg flex items-center" /></>
                                </span>
                            </Button>
                        </Link>
                    </div>

                </div>

            </div>
        </RootLayout>
    </>;
}
