"use client";

import Link from "next/link";
import { Twirl as Hamburger } from "hamburger-react";
import { useState } from "react";
import { navigationLinks } from "./navigation-links";

import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import EmailIcon from "@mui/icons-material/Email";
import { SvgIcon, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

type iconLookupType = {
    display: string
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>
}

const mobileLinkIcons: iconLookupType[] = [
    {
        display: "Home",
        icon: HomeIcon
    },
    {
        display: "Resume",
        icon: WorkIcon
    },
    {
        display: "Portfolio",
        icon: SchoolIcon
    },
    {
        display: "Interests",
        icon: LibraryMusicIcon
    },
    {
        display: "Contact Me",
        icon: EmailIcon
    },
];

function lookupMobileIcon(pageName: string) {
    return mobileLinkIcons.find(mobileLinkIcons => mobileLinkIcons.display === pageName)?.icon ?? HomeIcon;
}

export default function Navigation() {

    const [isOpen, setIsOpen] = useState(false);

    const desktopMenuList = navigationLinks.map((menuItem) =>
        <Link key={menuItem.display} href={menuItem.link} className="py-4 px-2 text-blue-300 no-underline hover:text-green-500 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out">{menuItem.display}</Link>
    );

    const mobileMenuList = navigationLinks.map((menuItem) =>
        // <div key={menuItem.display} className="group">
        //     <li className="flex items-center border-s-2 border-gray-500 group-hover:border-green-500 group-hover:border-s-8">
        //         <SvgIcon component={lookupMobileIcon(menuItem.display)} className="flex items-center"/>
        //         <Link href={menuItem.link} className="flex items-center text-sm rounded-md px-3 py-3 group-hover:font-semibold transition duration-300">{menuItem.display}</Link>
        //     </li>
        // </div>
        <div key={menuItem.display} className="mobile-menu group flex items-center w-full">
            <li className="flex items-center w-full group-hover:text-green-500">
                <Link key={menuItem.display} href={menuItem.link} className="flex items-center">
                    <SvgIcon component={lookupMobileIcon(menuItem.display)} className="flex items-center" />
                    <span className="flex items-center text-sm rounded-md px-3 py-3 group-hover:font-semibold">{menuItem.display}</span>
                </Link>
            </li>
        </div>
    );

    return (
        <>
            <nav className="absolute w-full right-0 top-0 z-50 bg-gray-900 md:bg-transparent">
                <div className="container mx-auto p-3">
                    <div className="flex justify-between">

                        {/* Logo */}
                        <div className="flex space-x-7">
                            <div className="m-auto">
                                <Link className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl" href="/">
                                    <span className="logo-full-name bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-pink-800 to-purple-700 py-1">Tyler Latshaw</span>
                                </Link>
                            </div>
                        </div>

                        {/* Navbar items */}
                        <div className="hidden md:flex items-center space-x-3">
                            {desktopMenuList}
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button className="outline-none">
                                <Hamburger toggled={isOpen} toggle={setIsOpen} size={20} rounded label="Show menu" hideOutline={false} />
                            </button>
                        </div>

                    </div>
                </div>

                {/* Mobile menu */}
                {isOpen ?
                    <div className="mobile-menu bg-gray-700 md:hidden shadow w-full p-3 ">
                        <ul className="space-y-3">
                            {mobileMenuList}
                        </ul>
                    </div> : null}
            </nav>

        </>
    );
}