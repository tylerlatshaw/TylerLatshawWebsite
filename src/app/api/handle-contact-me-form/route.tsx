import { NextResponse } from 'next/server';
import { Resend } from 'resend';

import MessageReceived from '@/components/emails/message-received';
import { getCurrentDate, getCurrentDateTime } from '@/utilities/date-utilities';
import { addContactToDatabase } from '@/database/contact';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
const fromAddress = process.env.NEXT_PUBLIC_RESEND_FROM;
const myEmailAddress = process.env.NEXT_PUBLIC_RESEND_MY_EMAIL;

export async function POST(request: Request) {

    const { name, email, message, source, referringPage } = await request.json();

    const date = getCurrentDate();
    const dateTime = getCurrentDateTime(date);
    var title = '';
    var subject = '';
    var fallbackText = '';

    var messageData = {
        date,
        dateTime,
        title,
        name,
        email,
        message,
        source,
        referringPage
    }

    addContactToDatabase(messageData);

    messageData.title = "New Contact Form Submission 📧";
    subject = 'New Contact Form Submission' + date;
    fallbackText = '';

    await resend.sendEmail({
        from: `${fromAddress}`,
        to: email,
        subject: subject,
        text: fallbackText,
        react: <MessageReceived messageData={messageData} />
    });

    return NextResponse.json({
        status: 'Ok'
    });
}