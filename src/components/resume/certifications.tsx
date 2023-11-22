"use client";

import Image from "next/image";
import { Card, CardBody } from "@material-tailwind/react";
import { certificationRibbon, certificationRibbonType } from "@/app/lib/certification-data";

export default function CertificationsSection() {

    function certificationCard(certification: certificationRibbonType) {

        const { name, altText, logo, link } = certification;

        return <>
            <Card className="w-full h-full justify-between bg-gray-800 shadow-xl shadow-gray-900/70 rounded-lg">
                <CardBody>
                    <div className="flex justify-center">
                        {
                            link ?
                                <a href={link} className="inline-block" target="_blank">
                                    <Image src={logo} width={165} height={150} alt={altText} className="drop-shadow-2xl" />
                                </a> : <Image src={logo} width={165} height={150} alt={altText} className="drop-shadow-2xl" />
                        }
                    </div>
                    <div className="w-full text-center">
                        <span className="w-full text-xl font-semibold line-clamp-2">
                            {
                                link ?
                                    <a href={link} className="inline-block hover:text-green-500" target="_blank">
                                        {name}
                                    </a> : name
                            }
                        </span>
                    </div>
                </CardBody>
            </Card>
        </>;
    }

    return (
        <>
            <div className="flex flex-col md:flex-row mt-6 w-full space-x-0 md:space-x-3 space-y-3 md:space-y-0">
                {
                    certificationRibbon.map((certification) =>
                        <div key={certification.altText} className="flex items-stretch basis-1/5">
                            {
                                certificationCard(certification)
                            }
                        </div>
                    )
                }
            </div>
        </>
    );
}