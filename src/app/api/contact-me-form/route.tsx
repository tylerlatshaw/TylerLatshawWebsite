import { NextResponse } from "next/server";
import { Resend } from "resend";

import MessageReceived from "@/components/emails/new-message-received";
import ThankYouEmail from "@/components/emails/thank-you-email";
import { getCurrentDate, getCurrentDateTime } from "@/utilities/date-utilities";
import { addContactMessage } from "@/database/contact";

import type { ContactFormType } from "@/app/lib/type-library";

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
    } = await request.json() as ContactFormType;

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
        referringPage
    };

    await Promise.all([
        addContactMessage(messageData),
        resend.sendEmail({
            from: `${fromAddress}`,
            to: `${myEmailAddress}`,
            subject: "New Contact Form Submission: " + email,
            text: "",
            react: <MessageReceived messageData={{ ...messageData, title: "New Contact Form Submission" }} />,
        }),
        resend.sendEmail({
            from: `${fromAddress}`,
            to: email,
            subject: "Thanks for reaching out!",
            text: "",
            react: <ThankYouEmail messageData={{ ...messageData, title: "I'll be in touch soon! ✉️" }} />,
        })
    ]);

    return NextResponse.json({
        status: "Ok",
        message: "Got it! I'll be in touch soon.",
    });
}