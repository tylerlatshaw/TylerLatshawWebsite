import { Resend } from 'resend';
import EmailTemplate from '@/components/emails/coming-soon'

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
const fromAddress = process.env.NEXT_PUBLIC_RESEND_FROM;

async function TestEmail() {
  try {
    const data = await resend.emails.send({
      from: `${fromAddress}`,
      to: `tylerlatshaw@gmail.com`,
      subject: '🚀 Exciting News: My Website is Now Live! 🎉',
      text: 'Test',
      react: <EmailTemplate />
    });

    console.log(data);
  } catch (error) {
    console.error(error);
  }
}


export default async function Page() {

  await TestEmail();

  return <h1>Hello!</h1>
}