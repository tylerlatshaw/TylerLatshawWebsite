import { navigationLinks, supplementalLinks } from "@/app/lib/navigation-links";
import { MetadataRoute } from "next";

import type { NavigationLinkType } from "./lib/type-library";

type sitemapType = Array<{
    url: string
    lastModified?: string | Date
    changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never"
    priority?: number
}>

export default function sitemap(): MetadataRoute.Sitemap {

    const sitemapLinks: NavigationLinkType[] = [...navigationLinks, ...supplementalLinks];

    var sitemapJson: sitemapType = [];

    sitemapLinks.map((item) => {
        sitemapJson.push({
            url: process.env.BASE_URL + item.link,
            lastModified: new Date,
            changeFrequency: item.changeFrequency,
            priority: item.priority
        });
    });

    return sitemapJson;
}