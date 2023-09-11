import { PrismaClient } from '@prisma/client'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Database Test',
}

const prisma = new PrismaClient()

export default async function Page() {
    const artists = await prisma.artists.findMany();
    prisma.$disconnect();

    return <>
        <div className="h-full mb-16 md:pb-8 md:mb-28">
            <div className="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col md:flex-row items-center">
                {artists.map(a =>
                    <>
                        <span>{a.Name}</span>
                        <br />
                    </>)}
            </div>
        </div>
    </>
}