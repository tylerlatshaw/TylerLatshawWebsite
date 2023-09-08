'use client'

import { useSearchParams } from 'next/navigation'

import { Resend } from 'resend';
import EmailTemplate from '@/components/emails/coming-soon'

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
const fromAddress = process.env.NEXT_PUBLIC_RESEND_FROM;

async function TestEmail(toAddress: string | ' ') {

  try {
    const data = await resend.emails.send({
      from: `${fromAddress}`,
      to: `${toAddress}`,
      subject: '🚀 Exciting News: My Website is Now Live! 🎉',
      text: 'Test',
      react: <EmailTemplate />
    });

    console.log(data);
  } catch (error) {
    console.error(error);
  }
}


export default function Page() {

  const searchParams = useSearchParams()

  if (searchParams.get('email')) {
    var toAddress =  ' ';
    toAddress = searchParams.get('email')!;
    TestEmail(toAddress);
    return <h1>Email sent to: {toAddress}</h1>
  } else {
    return <h1>Email not sent!</h1>
  }
}