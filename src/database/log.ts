import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addDatabaseLog() {

    const count = await prisma.contact.count({});

    return await prisma.log.create({
        data: {
            CountMessages: count
        }
    });
}