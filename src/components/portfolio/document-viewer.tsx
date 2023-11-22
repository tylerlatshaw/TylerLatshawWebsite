"use client";

import { portfolioOptionType } from "@/app/lib/portfolio-data";
import CreatedForSection from "./created-for";
import { companyData } from "@/app/lib/resume-data";
import { Button } from "@material-tailwind/react";

export default function DocumentViewer(portfolio: portfolioOptionType) {

    const { name, description, date, associatedWith, assetLink, webLink } = portfolio;

    function createDocumentPane() {
        return <iframe src={assetLink!} className="w-full h-screen max-h-[850px]" />;
    }

    function mainDescription() {
        return <>
            <div className="flex flex-col w-full bg-[#323639] justify-center mb-4 px-5 py-4">
                <div className="">
                    <div className="flex flex-col md:flex-row w-full gap-5">
                        <div className="grow">
                            <span dangerouslySetInnerHTML={{ __html: description }} />
                        </div>
                        {
                            associatedWith ? <div className="flex-none self-center">{createdForText()}</div> : null
                        }
                    </div>
                    <div className="flex flex-col md:flex-row mt-3">
                        {
                            webLink !== null ? <div className="text-center md:text-left w-fit mr-3">
                                <a href={webLink} target="_blank">
                                    <Button className="button text-white bg-green-700 hover:bg-green-800 focus:ring-2 focus:outline-none focus:ring-green-900 font-medium text-base px-5 py-2.5 text-center capitalize">
                                        {name}
                                    </Button>
                                </a>
                            </div> : null
                        }
                        {
                            date ? <div className="self-center">
                                <span className="text-gray-400">
                                    Created: {date.toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                                </span>
                            </div> : null
                        }
                    </div>
                </div>
            </div>
        </>;
    }

    function createdForText() {
        const associatedOrganization = companyData.find((company) => company.company === associatedWith);

        return <>
            <CreatedForSection company={associatedOrganization?.company!} logo={associatedOrganization?.logo!} avatar={associatedOrganization?.avatar!} location={associatedOrganization?.location!} />
        </>;
    }

    return (
        <>
            <div className="w-full">
                <h1>{name}</h1>

                <div className="flex flex-col w-full bg-white rounded mb-6 p-4">
                    {
                        mainDescription()
                    }
                    {
                        createDocumentPane()
                    }
                </div>
            </div>
        </>
    );
}