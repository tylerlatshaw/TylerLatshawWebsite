"use client";

import Image from "next/image";
import { Card, CardBody } from "@material-tailwind/react";
import { certificationRibbon, certificationRibbonType } from "@/app/lib/certification-data";

export default function CertificationsList() {

    function certificationCard(certification: certificationRibbonType) {

        const { name, altText, logo } = certification;

        return <>
            {
                <Card className="w-full h-full justify-between bg-gray-800 group-hover:bg-blue-800 shadow-xl shadow-gray-900/70 rounded-lg">
                    <CardBody>
                        <div className="flex justify-center">
                            <Image src={logo} width={165} height={150} alt={altText} className="drop-shadow-2xl" />
                        </div>
                        <div className="flex items-center w-full min-h-[56px] text-center">
                            <div className="w-full text-xl font-semibold line-clamp-2">
                                {name}
                            </div>
                        </div>
                    </CardBody>
                </Card>
            }
        </>;
    }

    return (
        <>
            <div className="flex flex-col md:flex-row mt-6 w-full space-x-0 md:space-x-3 space-y-3 md:space-y-0">
                {
                    certificationRibbon.map((certification) =>
                        <div key={certification.altText} className="flex items-stretch basis-1/5">
                            {
                                certification.link ?
                                    <a href={certification.link} className="group w-full" target="_blank">{certificationCard(certification)}</a>
                                    : certificationCard(certification)
                            }
                        </div>
                    )
                }
            </div>
        </>
    );
}