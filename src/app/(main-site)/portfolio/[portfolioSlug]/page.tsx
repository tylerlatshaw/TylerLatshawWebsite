"use client";

import { portfolioOptions, portfolioOptionType } from "@/app/lib/portfolio-data";
import NotFound from "@/components/portfolio/not-found";
import DocumentViewer from "@/components/portfolio/document-viewer";
import { useEffect, useState } from "react";

export default function PortfolioItem({ params }: {
    params: {
        portfolioSlug: string
    }
}) {
    const [portfolioData, setPortfolioData] = useState<portfolioOptionType | null>();

    useEffect(() => {
        if (portfolioOptions.filter(e => e.portfolioSlug === params.portfolioSlug).length > 0) {
            setPortfolioData(portfolioOptions.find((e) =>
                e.portfolioSlug === params.portfolioSlug));
        } else {
            setPortfolioData(null);
        }
    }, [params.portfolioSlug]);

    return <>
        <div className="h-full px-4 md:px-0 mb-16 md:mb-40">
            <div className="container flex flex-wrap mx-auto pt-28 md:pt-36">
                {
                    portfolioData !== null ?
                        <>
                            <DocumentViewer
                                portfolioSlug={params.portfolioSlug}
                                name={portfolioData?.name!}
                                isFeatured={portfolioData?.isFeatured!}
                                description={portfolioData?.description!}
                                date={portfolioData?.date!}
                                associatedWith={portfolioData?.associatedWith!}
                                previewLink={portfolioData?.previewLink!}
                                assetLink={portfolioData?.assetLink!} order={portfolioData?.order!} webLink={portfolioData?.webLink!}
                            />
                        </> :
                        <NotFound />
                }
            </div>
        </div>
    </>;
}