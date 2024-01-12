import { NextResponse } from "next/server";
import { Resend } from "resend";

import MessageReceived from "@/components/emails/new-message-received";
import ComingSoonOnList from "@/components/emails/coming-soon-on-the-list";
import { getCurrentDate, getCurrentDateTime } from "@/utilities/date-utilities";
import { addContactMessage, getContactEmail } from "@/database/contact";

import type { ComingSoonDataType } from "@/app/lib/type-library";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
const fromAddress = process.env.NEXT_PUBLIC_RESEND_FROM;
const myEmailAddress = process.env.NEXT_PUBLIC_RESEND_MY_EMAIL;

export async function POST(request: Request) {

    const {
        name,
        email,
        message,
        source,
        referringPage
    } = await request.json() as ComingSoonDataType;

    const contact = await getContactEmail(email, source);

    if (contact?.length! > 0) {
        return NextResponse.json({
            status: "Ok",
            message: "You're already on the list!",
        });
    }

    const date = getCurrentDate();
    const dateTime = getCurrentDateTime(date);
    const title = "";

    const messageData = {
        date,
        dateTime,
        title,
        name,
        email,
        message,
        source,
        referringPage,
    };

    await Promise.all([
        addContactMessage(messageData),
        resend.sendEmail({
            from: `${fromAddress}`,
            to: `${myEmailAddress}`,
            subject: "Notify When Site Goes Live: " + email,
            text: "",
            react: <MessageReceived messageData={{ ...messageData, title: "Notify When Site Goes Live 📫" }} />,
        }),
        resend.sendEmail({
            from: `${fromAddress}`,
            to: email,
            subject: "You're on the List!",
            text: "",
            react: <ComingSoonOnList messageData={{ ...messageData, title: "You're on the list! ✅" }} />,
        })
    ]);

    return NextResponse.json({
        status: "Ok",
        message: "Got it! I'll notify you when the site goes live.",
    });
}