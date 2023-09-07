import { Resend } from 'resend';
import EmailTemplate from '@/components/emails/sample-vercel'
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

async function TestEmail () {
  try {
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['tylerlatshaw@gmail.com'],
      subject: 'Hello World',
      react: <EmailTemplate />
    });

    console.log(data);
  } catch (error) {
    console.error(error);
  }
}


export default async function Page () {

    await TestEmail();

    return <h1>Hello!</h1>
}