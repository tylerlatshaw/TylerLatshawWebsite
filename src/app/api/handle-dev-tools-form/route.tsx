import { NextResponse } from "next/server";
import { Resend } from "resend";

import MessageReceived from "@/components/emails/new-message-received";
import ThankYouEmail from "@/components/emails/thank-you-email";
import { getCurrentDate, getCurrentDateTime } from "@/utilities/date-utilities";
import { addContactToDatabase } from "@/database/contact";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
const fromAddress = process.env.NEXT_PUBLIC_RESEND_FROM;
const myEmailAddress = process.env.NEXT_PUBLIC_RESEND_MY_EMAIL;

export type RequestJson = {
    name: string,
    email: string,
    message: string,
    source: string,
    referringPage: string,
}

export async function POST(request: Request) {

    const { name, email, message, source, referringPage } = await request.json() as RequestJson;

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
            subject: "New Contact Form Submission: " + email,
            text: "",
            react: <MessageReceived messageData={{ ...messageData, title: "New Contact Form Submission" }} />
        }),
        resend.sendEmail({
            from: `${fromAddress}`,
            to: email,
            subject: "Thanks for reaching out!",
            text: "",
            react: <ThankYouEmail messageData={{ ...messageData, title: "I'll be in touch soon! ✉️" }} />
        })
    ]);

    return NextResponse.json({
        status: "Ok",
        message: "Got it! I'll be in touch soon."
    });
}