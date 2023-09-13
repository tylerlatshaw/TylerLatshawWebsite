import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface MessageData {
    date: string;
    dateTime: string;
    title: string;
    name: string;
    email: string;
    message: string;
    referringPage: string;
    source: string;
}

export async function addContactToDatabase(messageData: MessageData) {
    await prisma.contact.create({
        data: {
            Name: messageData.name,
            Email: messageData.email,
            Message: messageData.message,
            ReferringPage: messageData.referringPage,
            FormSource: messageData.source
        }
    });
}