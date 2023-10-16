import { NextResponse } from "next/server";
import { Resend } from "resend";

import MessageReceived from "@/components/emails/new-message-received";
import { getCurrentDate, getCurrentDateTime } from "@/utilities/date-utilities";
import { addContactToDatabase } from "@/database/contact";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
const fromAddress = process.env.NEXT_PUBLIC_RESEND_FROM;
//const myEmailAddress = process.env.NEXT_PUBLIC_RESEND_MY_EMAIL;

export async function POST(request: Request) {

    const { name, email, message, source, referringPage } = await request.json();

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
        addContactToDatabase(messageData),
        resend.sendEmail({
            from: `${fromAddress}`,
            to: email,
            subject: "New Contact Form Submission" + date,
            text: "",
            react: <MessageReceived messageData={{ ...messageData, title: "Notify When Site Goes Live 📫" }} />,
        })
    ]);

    return NextResponse.json({
        status: "Ok",
    });
}