import { NextResponse } from "next/server";
import { Resend } from "resend";

import CsOnList from "@/components/emails/coming-soon-on-the-list";
import CsSiteLive from "@/components/emails/coming-soon-site-is-live";
import MessageReceived from "@/components/emails/new-message-received";
import AutoReplyEmail from "@/components/emails/thank-you-email";

import { getCurrentDate, getCurrentDateTime } from "@/utilities/date-utilities";
import { TemplateOptions } from "@/components/developer/developer-email-send-form";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
const fromAddress = process.env.NEXT_PUBLIC_RESEND_FROM;
const devPrefix = "[Dev] ";

export type RequestJson = {
    selection: TemplateOptions
    formName: string
    email: string
    apiKey: string
    title: string
    name: string
    message: string
    source: string
    referringPage: string
}

export async function POST(request: Request) {

    const { selection,
        formName,
        email,
        apiKey,
        title,
        name,
        message,
        source,
        referringPage } = await request.json() as RequestJson;

    const date = getCurrentDate();
    const dateTime = getCurrentDateTime(date);

    const formData = {
        date,
        dateTime,
        selection,
        formName,
        email,
        apiKey,
        title,
        name,
        message,
        source,
        referringPage,
    };

    if (apiKey === process.env.NEXT_PUBLIC_API_KEY) {
        if (selection === "AutoReply") {
            await Promise.all([
                resend.sendEmail({
                    from: `${fromAddress}`,
                    to: formData.email,
                    subject: devPrefix + "Thanks for reaching out!" + " " + dateTime,
                    text: "",
                    react: <AutoReplyEmail messageData={{ ...formData, title: "I'll be in touch soon! ✉️" }} />,
                })
            ]);
        }

        if (selection === "CS-OnList") {
            resend.sendEmail({
                from: `${fromAddress}`,
                to: formData.email,
                subject: devPrefix + "You're on the List!" + " " + dateTime,
                text: "",
                react: <CsOnList messageData={{ ...formData, title: "You're on the list! ✅" }} />,
            });
        }

        if (selection === "CS-SiteLive") {
            resend.sendEmail({
                from: `${fromAddress}`,
                to: formData.email,
                subject: devPrefix + "Exciting News: My Website is Now Live! 🎉" + " " + dateTime,
                text: "",
                react: <CsSiteLive messageData={{ ...formData, title: "Exciting News: My Website is Now LIVE! 🎉" }} />,
            });
        }

        if (selection === "NewMessage") {
            await Promise.all([
                resend.sendEmail({
                    from: `${fromAddress}`,
                    to: formData.email,
                    subject: devPrefix + "New Contact Form Submission: " + formData.email + " " + dateTime,
                    text: "",
                    react: <MessageReceived messageData={{ ...formData, title: "New Contact Form Submission" }} />,
                })
            ]);
        }

        return NextResponse.json({
            status: "Ok",
            message: formData.formName + " sent successfully to " + formData.email,
        });
    }

    return NextResponse.json({
        status: "Error",
        message: "Authentication Error: Invalid API Key",
    });
}