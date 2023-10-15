"use client";

import { PrivacyPolicyText } from "./privacy-policy-text";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import { Twirl as Hamburger } from "hamburger-react";
import { useState } from "react";

type headings = {
    name: string
    anchor: string
}

const headerLinks: headings[] = [
    {
        name: "Privacy Policy",
        anchor: "#policy",
    },
    {
        name: "Summary",
        anchor: "#summary",
    },
    {
        name: "Information Collected",
        anchor: "#infocollect",
    },
    {
        name: "Use of Information",
        anchor: "#infouse",
    },
    {
        name: "Information Sharing",
        anchor: "#whoshare",
    },
    {
        name: "Cookie Use",
        anchor: "#cookies",
    },
    {
        name: "Information Retention",
        anchor: "#inforetain",
    },
    {
        name: "Security",
        anchor: "#infosafe",
    },
    {
        name: "Use by Minors",
        anchor: "#infominors",
    },
    {
        name: "Your Rights",
        anchor: "#privacyrights",
    },
    {
        name: "Do Not Track",
        anchor: "#DNT",
    },
    {
        name: "California Residents",
        anchor: "#caresidents",
    },
    {
        name: "Policy Updates",
        anchor: "#policyupdates",
    },
    {
        name: "How to Contact",
        anchor: "#contact",
    },
    {
        name: "Data Request",
        anchor: "#request",
    }
];

export default function PrivacyPolicy() {

    const [isOpen, setIsOpen] = useState(false);

    let buttonClasses: string;

    isOpen ? buttonClasses = "w-full pl-3 pr-1 text-left border-b-[1px] border-gray-300" : buttonClasses = "w-full pl-3 pr-1 text-left border-0";

    function generateNavigation() {
        return (
            <>
                <div className="hidden md:block sticky top-0 space-y-4">
                    <div className="h-fit bg-white/50 rounded-lg border-2 border-white">
                        <ul className="text-base py-3">

                            {headerLinks.map((links) => (
                                <li key={links.name} className="flex items-center w-full first:font-bold first:uppercase hover:bg-gray-300/100">
                                    <a className="w-full py-1 px-3" href={links.anchor}>
                                        {links.name}
                                    </a>
                                </li>
                            ))}

                        </ul>
                    </div>

                    <div className="h-fit bg-white/50 rounded-lg border-2 border-white">
                        <a href="#">
                            <button type="button" className="w-full py-2 px-3 text-left font-bold hover:bg-gray-300/100">
                                <span className="text-left">Go to Top</span>
                                <ArrowCircleUpIcon className="float-right" />
                            </button>
                        </a>
                    </div>
                </div>

                <div className="block md:hidden">
                    <div className="h-fit bg-white/50 rounded-lg border-2 border-white">
                        <ul className="text-base">

                            <div className={buttonClasses}>
                                <span className="flex flex-row font-semibold">
                                    <span className="flex items-center basis-full">Navigation</span>
                                    <span className="flex items-center">
                                        <Hamburger toggled={isOpen} toggle={setIsOpen} size={18} rounded label="Show menu" color="#000000" hideOutline={false} />
                                    </span>
                                </span>
                            </div>

                            {isOpen ? <>
                                <div className="gap-2 py-2">
                                    {headerLinks.map((links) => (
                                        <li key={links.name} className="flex items-center w-full first:hidden hover:bg-gray-300/100">
                                            <a className="w-full px-3 py-px" href={links.anchor} onClick={() => { setIsOpen(false); }}>
                                                {links.name}
                                            </a>
                                        </li>
                                    ))}
                                </div>
                            </> : null}

                        </ul>
                    </div>
                </div>
            </>
        );
    }

    return <>
        <div className="privacy-policy flex flex-col md:flex-row text-black gap-0 md:gap-4 space-y-4 md:space-y-0">
            <aside className="flex-none w-full md:w-fit">
                {generateNavigation()}
            </aside>

            <div className="privacy-policy-main p-4 text-base bg-white/50 rounded-lg border-2 border-white" id="policy">
                <PrivacyPolicyText />
            </div>
        </div>
    </>;
}