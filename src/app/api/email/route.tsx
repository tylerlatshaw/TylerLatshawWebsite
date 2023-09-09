import { NextResponse } from 'next/server';
import { Resend } from 'resend';

import MessageReceived from '@/components/emails/message-received';
import ComingSoonOnList from '@/components/emails/coming-soon-on-the-list';

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

    if (source === 'Coming Soon Notify Me') {
        //Send email to me
        messageData.title = "Notify When Site Goes Live 📫";
        subject = 'Notify When Site Goes Live: ' + email;
        fallbackText = '';

        await resend.sendEmail({
            from: `${fromAddress}`,
            to: `${myEmailAddress}`,
            subject: subject,
            text: fallbackText,
            react: <MessageReceived messageData={messageData} />
        });

        //Send email to the user
        messageData.title = "You're on the list! ✅";
        subject = 'You\'re on the List!';
        fallbackText = '';

        await resend.sendEmail({
            from: `${fromAddress}`,
            to: email,
            subject: subject,
            text: fallbackText,
            react: <ComingSoonOnList messageData={messageData} />
        });
    } else if (source === 'Contact Me') {
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
    } else {
        messageData.title = "Default";
        subject = 'Some Message ' + date;
        fallbackText = '';

        await resend.sendEmail({
            from: `${fromAddress}`,
            to: email,
            subject: subject,
            text: fallbackText,
            react: <MessageReceived messageData={messageData} />
        });
    }

    return NextResponse.json({
        status: 'Ok'
    });
}

function getCurrentDate() {
    var month = new Date().getMonth();
    var day = new Date().getDay();
    var year = new Date().getFullYear();

    return month + '/' + day + '/' + year;
}

function getCurrentDateTime(date: string) {
    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();
    var seconds = new Date().getSeconds();

    return date + ' ' + hours + ':' + minutes + ':' + seconds;
}