import { NextResponse } from 'next/server';
import { Resend } from 'resend';

import WelcomeEmail from '@/components/emails/message-received';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
const fromAddress = process.env.NEXT_PUBLIC_RESEND_FROM;

export async function POST(request: Request) {

    const { name, email, message, source } = await request.json();

    var title="New Submission!&nbsp;📫";

    const messageData = {
        title,
        name,
        email,
        message,
        source
    }

    await resend.sendEmail({
        from: `${fromAddress}`,
        to: email,
        subject: '🚀 Exciting News: My Website is Now Live! 🎉',
        text: 'Test',
        react: <WelcomeEmail messageData/>

    });

    return NextResponse.json({
        status: 'Ok'
    });
}