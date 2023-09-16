import { NextResponse } from "next/server";
import { Resend } from "resend";

import MessageReceived from "@/components/emails/new-message-received";
import ComingSoonOnList from "@/components/emails/coming-soon-on-the-list";
import { getCurrentDate, getCurrentDateTime } from "@/utilities/date-utilities";
import { addContactToDatabase, lookupByEmailAndSource } from "@/database/contact";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
const fromAddress = process.env.NEXT_PUBLIC_RESEND_FROM;
const myEmailAddress = process.env.NEXT_PUBLIC_RESEND_MY_EMAIL;

export async function POST(request: Request) {

    const { name, email, message, source, referringPage } = await request.json();

    const contact = await lookupByEmailAndSource(email, source);

    if(contact) {
        return NextResponse.json({
            status: "Ok",
            message: "You're already on the list!"
        });
    }

    const date = getCurrentDate();
    const dateTime = getCurrentDateTime(date);
    var title = "";

    var messageData = {
        date,
        dateTime,
        title,
        name,
        email,
        message,
        source,
        referringPage
    };

    await Promise.all([
        addContactToDatabase(messageData),
        resend.sendEmail({
            from: `${fromAddress}`,
            to: `${myEmailAddress}`,
            subject: "Notify When Site Goes Live: " + email,
            text: "",
            react: <MessageReceived messageData={{ ...messageData, title: "Notify When Site Goes Live 📫" }} />
        }),
        resend.sendEmail({
            from: `${fromAddress}`,
            to: email,
            subject: "You're on the List!",
            text: "",
            react: <ComingSoonOnList messageData={{ ...messageData, title: "You're on the list! ✅" }} />
        })
    ]);

    return NextResponse.json({
        status: "Ok",
        message: "Got it! I'll notify you when the site goes live."
    });
}