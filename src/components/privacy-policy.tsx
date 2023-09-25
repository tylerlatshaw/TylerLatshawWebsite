import { PrivacyPolicyText } from "./privacy-policy-text";

type headings = {
    name: string
    anchor: string
}

const headerLinks: headings[] = [
    {
        name: "Summary",
        anchor: "#summary"
    },
    {
        name: "Information Collected",
        anchor: "#infocollect"
    },
    {
        name: "Use of Information",
        anchor: "#infouse"
    },
    {
        name: "Information Sharing",
        anchor: "#whoshare"
    },
    {
        name: "Cookie Use",
        anchor: "#cookies"
    },
    {
        name: "Information Retention",
        anchor: "#inforetain"
    },
    {
        name: "Security",
        anchor: "#infosafe"
    },
    {
        name: "Use by Minors",
        anchor: "#infominors"
    },
    {
        name: "Your Rights",
        anchor: "#privacyrights"
    },
    {
        name: "Do Not Track",
        anchor: "#DNT"
    },
    {
        name: "California Residents",
        anchor: "#caresidents"
    },
    {
        name: "Policy Updates",
        anchor: "#policyupdates"
    },
    {
        name: "How to Contact",
        anchor: "#contact"
    },
    {
        name: "Data Request",
        anchor: "#request"
    }
];

export default function PrivacyPolicy() {

    function generateSidebar() {
        return (
            <ul className="space-y-1 text-sm">
                <li className="flex items-center font-bold px-2 py-1">
                    CONTENTS
                </li>

                {headerLinks.map((links) => (
                    <li key={links.name} className="flex items-center rounded-lg hover:bg-gray-100 hover:text-gray-900">
                        <a className="px-2 py-1 w-full" href={links.anchor}>
                            {links.name}
                        </a>
                    </li>
                ))}

            </ul>
        );
    }

    return <>
        <div className="flex flex-row">
            <aside className="flex-none mt-4 w-fit">
                <div className="sticky top-0 pt-4 h-fit bg-gray-300 rounded-lg">
                    {generateSidebar()}
                </div>
            </aside>

            <div className="p-4 text-base bg-gray-800">
                <PrivacyPolicyText />
            </div>
        </div>
    </>;
}