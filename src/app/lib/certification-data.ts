export type certificationRibbonType = {
    name: string,
    altText: string,
    logo: string,
    link: string | null
}

export const certificationRibbon: certificationRibbonType[] = [
    {
        name: "Advanced Certified ScrumMaster",
        altText: "A-CSM Logo",
        logo: "/static/cert-acsm.svg",
        link: "https://bcert.me/bc/html/show-badge.html?b=sdaeiqcc"
    },
    {
        name: "Certified ScrumMaster",
        altText: "CSM Logo",
        logo: "/static/cert-csm.svg",
        link: "https://bcert.me/bc/html/show-badge.html?b=vhkdzsmg"
    },
    {
        name: "Comptia A+",
        altText: "Comptia A+ Logo",
        logo: "/static/cert-comptia.svg",
        link: "https://www.credly.com/badges/68fcacd5-757a-433d-95e7-f5979a6b268b"
    },
    {
        name: "Certified Foodservice Professional",
        altText: "CFSP Logo",
        logo: "/static/cert-cfsp.svg",
        link: "https://cfsp.nafem.org/cfsp-wall-of-fame/"
    },
    {
        name: "ServSafe Food Protection Manager",
        altText: "ServSafe Logo",
        logo: "/static/cert-servsafe.svg",
        link: null
    }
];